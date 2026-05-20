const express = require('express');
const { getRedis } = require('../redis');

const router = express.Router();

router.post('/', async (req, res) => {
  const { sku, qty = 1 } = req.body || {};
  if (!sku) return res.status(400).json({ error: 'sku_required' });
  const redis = await getRedis();
  await redis.hIncrBy('cart:default', sku, Number(qty));
  const cart = await redis.hGetAll('cart:default');
  res.json({ status: 'ok', cart });
});

router.get('/', async (_req, res) => {
  const redis = await getRedis();
  const cart = await redis.hGetAll('cart:default');
  res.json({ cart });
});

module.exports = router;
