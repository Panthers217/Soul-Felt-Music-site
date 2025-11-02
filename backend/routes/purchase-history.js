import { Router } from 'express';
import db from '../config/db.js';

const router = Router();

/**
 * GET /api/purchase-history/user-email/:email
 * Get all purchases and order items for a specific user by email
 */
router.get('/user-email/:email', async (req, res) => {
  try {
    const { email } = req.params;

    // First, look up the user_id from the email
    const [users] = await db.query(
      'SELECT id FROM user WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.json({
        email: email,
        purchase_count: 0,
        purchases: []
      });
    }

    const userId = users[0].id;

    // Get user's purchases with order items
    const [purchases] = await db.query(
      `SELECT 
        p.id as purchase_id,
        p.order_id,
        p.stripe_payment_intent_id,
        p.amount,
        p.currency,
        p.payment_status,
        p.customer_email,
        p.customer_name,
        p.item_type,
        p.purchased_at,
        p.updated_at,
        oi.id as order_item_id,
        oi.item_type as item_type_detail,
        oi.item_id,
        oi.item_title,
        oi.artist_name,
        oi.quantity,
        oi.price as item_price
      FROM purchases p
      LEFT JOIN order_items oi ON p.id = oi.purchase_id
      WHERE p.user_id = ?
      ORDER BY p.purchased_at DESC, oi.id`,
      [userId]
    );

    // Group order items by purchase
    const purchaseMap = {};
    purchases.forEach(row => {
      if (!purchaseMap[row.purchase_id]) {
        purchaseMap[row.purchase_id] = {
          purchase_id: row.purchase_id,
          order_id: row.order_id,
          stripe_payment_intent_id: row.stripe_payment_intent_id,
          amount: row.amount,
          currency: row.currency,
          payment_status: row.payment_status,
          customer_email: row.customer_email,
          customer_name: row.customer_name,
          item_type: row.item_type,
          purchased_at: row.purchased_at,
          updated_at: row.updated_at,
          items: []
        };
      }

      if (row.order_item_id) {
        purchaseMap[row.purchase_id].items.push({
          order_item_id: row.order_item_id,
          item_type: row.item_type_detail,
          item_id: row.item_id,
          item_title: row.item_title,
          artist_name: row.artist_name,
          quantity: row.quantity,
          price: row.item_price
        });
      }
    });

    const purchaseHistory = Object.values(purchaseMap);

    res.json({
      email: email,
      user_id: userId,
      purchase_count: purchaseHistory.length,
      purchases: purchaseHistory
    });
  } catch (error) {
    console.error('Error fetching purchase history by email:', error);
    res.status(500).json({ error: 'Failed to fetch purchase history' });
  }
});

/**
 * GET /api/purchase-history/user/:userId
 * Get all purchases and order items for a specific user by ID
 * Admin only or authenticated user viewing their own history
 */
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Get user's purchases with order items
    const [purchases] = await db.query(
      `SELECT 
        p.id as purchase_id,
        p.order_id,
        p.stripe_payment_intent_id,
        p.amount,
        p.currency,
        p.payment_status,
        p.customer_email,
        p.customer_name,
        p.item_type,
        p.purchased_at,
        p.updated_at,
        oi.id as order_item_id,
        oi.item_type as item_type_detail,
        oi.item_id,
        oi.item_title,
        oi.artist_name,
        oi.quantity,
        oi.price as item_price
      FROM purchases p
      LEFT JOIN order_items oi ON p.id = oi.purchase_id
      WHERE p.user_id = ?
      ORDER BY p.purchased_at DESC, oi.id`,
      [userId]
    );

    // Group order items by purchase
    const purchaseMap = {};
    purchases.forEach(row => {
      if (!purchaseMap[row.purchase_id]) {
        purchaseMap[row.purchase_id] = {
          purchase_id: row.purchase_id,
          order_id: row.order_id,
          stripe_payment_intent_id: row.stripe_payment_intent_id,
          amount: row.amount,
          currency: row.currency,
          payment_status: row.payment_status,
          customer_email: row.customer_email,
          customer_name: row.customer_name,
          item_type: row.item_type,
          purchased_at: row.purchased_at,
          updated_at: row.updated_at,
          items: []
        };
      }

      if (row.order_item_id) {
        purchaseMap[row.purchase_id].items.push({
          order_item_id: row.order_item_id,
          item_type: row.item_type_detail,
          item_id: row.item_id,
          item_title: row.item_title,
          artist_name: row.artist_name,
          quantity: row.quantity,
          price: row.item_price
        });
      }
    });

    const purchaseHistory = Object.values(purchaseMap);

    res.json({
      user_id: userId,
      purchase_count: purchaseHistory.length,
      purchases: purchaseHistory
    });
  } catch (error) {
    console.error('Error fetching purchase history:', error);
    res.status(500).json({ error: 'Failed to fetch purchase history' });
  }
});

/**
 * GET /api/purchase-history/all
 * Get all purchases for admin dashboard
 * Admin only
 */
router.get('/all', async (req, res) => {
  try {
    // TODO: Add admin verification
    // if (!req.user.isAdmin) {
    //   return res.status(403).json({ error: 'Admin access required' });
    // }

    const { status, limit = 50, offset = 0 } = req.query;

    let query = `
      SELECT 
        p.id as purchase_id,
        p.user_id,
        p.order_id,
        p.stripe_payment_intent_id,
        p.amount,
        p.currency,
        p.payment_status,
        p.customer_email,
        p.customer_name,
        p.item_type,
        p.purchased_at,
        u.username,
        u.email as user_email,
        COUNT(oi.id) as item_count
      FROM purchases p
      LEFT JOIN user u ON p.user_id = u.id
      LEFT JOIN order_items oi ON p.id = oi.purchase_id
    `;

    const params = [];
    
    if (status) {
      query += ' WHERE p.payment_status = ?';
      params.push(status);
    }

    query += ' GROUP BY p.id ORDER BY p.purchased_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [purchases] = await db.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM purchases';
    if (status) {
      countQuery += ' WHERE payment_status = ?';
    }
    const [countResult] = await db.query(countQuery, status ? [status] : []);

    res.json({
      total: countResult[0].total,
      limit: parseInt(limit),
      offset: parseInt(offset),
      purchases
    });
  } catch (error) {
    console.error('Error fetching all purchases:', error);
    res.status(500).json({ error: 'Failed to fetch purchases' });
  }
});

/**
 * GET /api/purchase-history/order/:orderId
 * Get specific order details with all items
 */
router.get('/order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    // Get purchase details
    const [purchases] = await db.query(
      `SELECT 
        p.*,
        u.username,
        u.email as user_email
      FROM purchases p
      LEFT JOIN user u ON p.user_id = u.id
      WHERE p.order_id = ?`,
      [orderId]
    );

    if (purchases.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const purchase = purchases[0];

    // Get order items
    const [items] = await db.query(
      `SELECT * FROM order_items WHERE purchase_id = ? ORDER BY id`,
      [purchase.id]
    );

    res.json({
      purchase,
      items
    });
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ error: 'Failed to fetch order details' });
  }
});

/**
 * GET /api/purchase-history/stats
 * Get purchase statistics for admin dashboard
 */
router.get('/stats', async (req, res) => {
  try {
    // TODO: Add admin verification

    // Total revenue
    const [revenueResult] = await db.query(
      `SELECT 
        SUM(amount) as total_revenue,
        COUNT(*) as total_orders,
        AVG(amount) as average_order_value
      FROM purchases 
      WHERE payment_status = 'succeeded'`
    );

    // Orders by status
    const [statusResult] = await db.query(
      `SELECT 
        payment_status,
        COUNT(*) as count,
        SUM(amount) as total_amount
      FROM purchases
      GROUP BY payment_status`
    );

    // Top selling items
    const [topItemsResult] = await db.query(
      `SELECT 
        oi.item_type,
        oi.item_title,
        oi.artist_name,
        COUNT(*) as order_count,
        SUM(oi.quantity) as total_quantity,
        SUM(oi.price * oi.quantity) as total_revenue
      FROM order_items oi
      JOIN purchases p ON oi.purchase_id = p.id
      WHERE p.payment_status = 'succeeded'
      GROUP BY oi.item_type, oi.item_id, oi.item_title, oi.artist_name
      ORDER BY total_quantity DESC
      LIMIT 10`
    );

    // Recent purchases (last 7 days)
    const [recentResult] = await db.query(
      `SELECT COUNT(*) as count, SUM(amount) as revenue
      FROM purchases
      WHERE payment_status = 'succeeded'
      AND purchased_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)`
    );

    res.json({
      overview: {
        total_revenue: revenueResult[0].total_revenue || 0,
        total_orders: revenueResult[0].total_orders || 0,
        average_order_value: revenueResult[0].average_order_value || 0
      },
      by_status: statusResult,
      top_items: topItemsResult,
      last_7_days: recentResult[0]
    });
  } catch (error) {
    console.error('Error fetching purchase stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

export default router;
