import Stripe from 'stripe';

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

    const { amount, cart, customerInfo } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: 'usd',
      metadata: {
        customerEmail: customerInfo.email,
        customerName: customerInfo.name,
        items: JSON.stringify(cart.map(item => ({
          title: item.title,
          price: item.price,
          type: item.type
        }))),
      },
      description: `Order for ${customerInfo.email}`,
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
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
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!', paymentIntent.id);
      // TODO: Fulfill the order, send confirmation email, etc.
      break;
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('PaymentIntent failed:', failedPayment.id);
      // TODO: Handle failed payment
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
}
