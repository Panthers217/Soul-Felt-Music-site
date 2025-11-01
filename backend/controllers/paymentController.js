import Stripe from 'stripe';
import db from '../config/db.js';

// Initialize Stripe with a check for the API key
const stripeKey = process.env.STRIPE_SECRET_KEY;
if (!stripeKey || stripeKey === 'your_stripe_secret_key_here') {
  console.warn('⚠️  WARNING: Stripe secret key not configured. Payment features will not work.');
  console.warn('⚠️  Get your key from: https://dashboard.stripe.com/test/apikeys');
}
const stripe = stripeKey && stripeKey !== 'your_stripe_secret_key_here' 
  ? new Stripe(stripeKey) 
  : null;

/**
 * Create a payment intent
 * @route POST /api/payments/create-payment-intent
 */
export async function createPaymentIntent(req, res) {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return res.status(503).json({ 
        error: 'Payment processing is not configured. Please contact support.' 
      });
    }

    const { amount, cart, customerInfo, userEmail } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Look up user_id from database if user is authenticated
    let userId = null;
    if (userEmail) {
      try {
        const [users] = await db.query('SELECT id FROM user WHERE email = ?', [userEmail]);
        if (users.length > 0) {
          userId = users[0].id;
          console.log(`✅ Found user_id ${userId} for email ${userEmail}`);
        }
      } catch (dbError) {
        console.error('Error looking up user:', dbError);
        // Continue without userId - guest checkout
      }
    }

    // Generate a unique order ID
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create simplified items summary for Stripe metadata (max 500 chars)
    const itemsSummary = cart.length === 1 
      ? `${cart[0].type}: ${cart[0].title}` 
      : `${cart.length} items (${[...new Set(cart.map(i => i.type))].join(', ')})`;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: 'usd',
      metadata: {
        orderId: orderId,
        userId: userId || 'guest',
        customerEmail: customerInfo.email,
        customerName: customerInfo.name,
        itemCount: cart.length.toString(),
        itemsSummary: itemsSummary.substring(0, 500) // Ensure it fits in 500 chars
      },
      description: `Order ${orderId} - ${itemsSummary.substring(0, 200)}`,
    });

    // Create a pending purchase record in database
    let purchaseId = null;
    try {
      // Calculate item_type summary from cart (e.g., "Track, Album, Merchandise")
      const itemTypes = [...new Set(cart.map(item => item.type || 'Unknown'))].join(', ');
      console.log('📋 Item types in order:', itemTypes);
      
      // Insert purchase record (one record per order)
      const [purchaseResult] = await db.query(
        `INSERT INTO purchases 
        (user_id, stripe_payment_intent_id, order_id, amount, currency, payment_status, 
         customer_email, customer_name, shipping_address, item_type, metadata) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userId || null,
          paymentIntent.id,
          orderId,
          amount / 100, // Convert cents to dollars
          'usd',
          'pending',
          customerInfo.email,
          customerInfo.name,
          JSON.stringify(customerInfo.address || {}),
          itemTypes,
          JSON.stringify({
            userAgent: req.headers['user-agent'],
            ip: req.ip
          })
        ]
      );
      
      purchaseId = purchaseResult.insertId;
      console.log(`✅ Created purchase record #${purchaseId} for order ${orderId}`);
      
      // Insert individual order items
      if (cart && cart.length > 0) {
        console.log('📦 Cart items to insert:', JSON.stringify(cart, null, 2));
        
        // Build order items with artist names looked up from database
        const orderItemsValues = await Promise.all(cart.map(async (item) => {
          let artistName = item.artist_name || item.artistName || null;
          
          // If no artist name provided, look it up from the database
          if (!artistName && item.id) {
            try {
              // Try to find artist name from tracks table
              const [trackRows] = await db.query(
                `SELECT a.name as artist_name 
                 FROM tracks t 
                 JOIN artists a ON t.artist_id = a.id 
                 WHERE t.id = ?`,
                [item.id]
              );
              
              if (trackRows.length === 0) {
                // Try albums table
                const [albumRows] = await db.query(
                  `SELECT a.name as artist_name 
                   FROM albums al 
                   JOIN artists a ON al.artist_id = a.id 
                   WHERE al.id = ?`,
                  [item.id]
                );
                
                if (albumRows.length > 0) {
                  artistName = albumRows[0].artist_name;
                }
              } else {
                artistName = trackRows[0].artist_name;
              }
            } catch (lookupError) {
              console.error('Error looking up artist name:', lookupError);
            }
          }
          
          const itemData = [
            purchaseId,
            item.type || 'track',
            item.id || item.track_id || item.album_id || 0,
            item.title,
            artistName,
            item.quantity || 1,
            typeof item.price === 'string' ? parseFloat(item.price.replace('$', '')) : (item.price || 0)
          ];
          console.log('Item data:', itemData);
          return itemData;
        }));
        
        console.log('🔄 Inserting order items...');
        const [itemsResult] = await db.query(
          `INSERT INTO order_items 
          (purchase_id, item_type, item_id, item_title, artist_name, quantity, price) 
          VALUES ?`,
          [orderItemsValues]
        );
        console.log(`✅ Created ${cart.length} order items for purchase #${purchaseId}`, itemsResult);
      } else {
        console.log('⚠️  No cart items to insert');
      }
    } catch (dbError) {
      console.error('❌ Error creating purchase record:', dbError);
      console.error('Error details:', dbError.message);
      console.error('SQL State:', dbError.sqlState);
      console.error('SQL Message:', dbError.sqlMessage);
      // Continue anyway - payment intent was created
    }

    res.json({
      clientSecret: paymentIntent.client_secret,
      orderId: orderId
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Webhook endpoint for Stripe events
 * @route POST /api/payments/webhook
 */
export async function handleWebhook(req, res) {
  // Check if Stripe is configured
  if (!stripe) {
    return res.status(503).json({ 
      error: 'Payment processing is not configured.' 
    });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSuccess = event.data.object;
      console.log('PaymentIntent was successful!', paymentIntentSuccess.id);
      
      // Update purchase record to completed
      try {
        await db.query(
          `UPDATE purchases 
           SET payment_status = 'succeeded', updated_at = NOW() 
           WHERE stripe_payment_intent_id = ?`,
          [paymentIntentSuccess.id]
        );
        console.log(`✅ Updated purchase record for payment ${paymentIntentSuccess.id}`);
        
        // TODO: Send confirmation email, fulfill order, etc.
        // You can access order details from paymentIntentSuccess.metadata
      } catch (dbError) {
        console.error('Error updating purchase record:', dbError);
      }
      break;
      
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('PaymentIntent failed:', failedPayment.id);
      
      // Update purchase record to failed
      try {
        await db.query(
          `UPDATE purchases 
           SET payment_status = 'failed', updated_at = NOW() 
           WHERE stripe_payment_intent_id = ?`,
          [failedPayment.id]
        );
        console.log(`⚠️  Updated purchase record to failed for payment ${failedPayment.id}`);
      } catch (dbError) {
        console.error('Error updating purchase record:', dbError);
      }
      break;
      
    case 'payment_intent.canceled':
      const canceledPayment = event.data.object;
      console.log('PaymentIntent was canceled:', canceledPayment.id);
      
      // Update purchase record to canceled
      try {
        await db.query(
          `UPDATE purchases 
           SET payment_status = 'canceled', updated_at = NOW() 
           WHERE stripe_payment_intent_id = ?`,
          [canceledPayment.id]
        );
      } catch (dbError) {
        console.error('Error updating purchase record:', dbError);
      }
      break;
      
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
}
