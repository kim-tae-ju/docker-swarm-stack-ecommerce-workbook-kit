const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const rows = await db.query('SELECT id, sku, name, price, stock FROM products ORDER BY id');
    res.json({ products: rows.map(({ id, sku, name, price, stock }) => ({ id, sku, name, price, stock })) });
  } catch (err) {
    res.status(500).json({ error: 'failed_to_load_products', detail: err.message });
  }
});

module.exports = router;
