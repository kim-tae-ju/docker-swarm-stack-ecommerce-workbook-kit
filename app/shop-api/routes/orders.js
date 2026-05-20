const express = require('express');
const db = require('../db');
const { getRedis } = require('../redis');

const router = express.Router();

router.post('/', async (req, res) => {
  const { customer = 'anonymous', items = [] } = req.body || {};
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'items_required' });
  }
  try {
    const result = await db.query('INSERT INTO orders(customer, status) VALUES(?, ?)', [customer, 'queued']);
    const orderId = Number(result.insertId);
    for (const item of items) {
      await db.query(
        'INSERT INTO order_items(order_id, sku, qty) VALUES(?, ?, ?)',
        [orderId, item.sku, Number(item.qty || 1)]
      );
    }
    const redis = await getRedis();
    await redis.rPush('orders', JSON.stringify({ orderId, customer, items }));
    res.status(201).json({ status: 'queued', orderId });
  } catch (err) {
    res.status(500).json({ error: 'failed_to_create_order', detail: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const rows = await db.query('SELECT id, customer, status, created_at FROM orders WHERE id=?', [Number(req.params.id)]);
    const order = rows[0];
    if (!order) return res.status(404).json({ error: 'order_not_found' });
    const items = await db.query('SELECT sku, qty FROM order_items WHERE order_id=? ORDER BY id', [order.id]);
    res.json({ order: { ...order, items } });
  } catch (err) {
    res.status(500).json({ error: 'failed_to_load_order', detail: err.message });
  }
});

module.exports = router;
