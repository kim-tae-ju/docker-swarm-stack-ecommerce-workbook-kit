const express = require('express');
const fs = require('fs');
const { getRedis } = require('../redis');

const router = express.Router();
const featureFlagPath = process.env.FEATURE_FLAGS_PATH || '/run/configs/api-feature-flags.json';

function loadFeatureFlags() {
  try {
    return JSON.parse(fs.readFileSync(featureFlagPath, 'utf8'));
  } catch (err) {
    return { loaded: false, reason: err.message };
  }
}

router.get('/queue', async (_req, res) => {
  const redis = await getRedis();
  const length = await redis.lLen('orders');
  const cartSize = Object.keys(await redis.hGetAll('cart:default')).length;
  res.json({ queue: 'orders', length, cartSize });
});

router.get('/config', async (_req, res) => {
  res.json({ featureFlags: loadFeatureFlags() });
});

module.exports = router;
