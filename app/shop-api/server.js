const express = require('express');
const fs = require('fs');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const ordersRouter = require('./routes/orders');
const adminRouter = require('./routes/admin');
const { healthSummary } = require('./health');

const app = express();
const port = process.env.PORT || 3000;
const jwtPath = process.env.JWT_SECRET_PATH || '/run/secrets/jwt_secret';

app.use(express.json());

app.get('/health', async (_req, res) => {
  const summary = await healthSummary();
  res.status(summary.status === 'ok' ? 200 : 503).json({ service: 'shop-api', ...summary });
});

app.get('/ready', async (_req, res) => {
  const summary = await healthSummary();
  res.status(summary.status === 'ok' ? 200 : 503).json({ ready: summary.status === 'ok', ...summary });
});

app.get('/config', (_req, res) => {
  let jwtLoaded = false;
  try {
    jwtLoaded = fs.existsSync(jwtPath) && fs.readFileSync(jwtPath, 'utf8').trim().length > 0;
  } catch (err) {
    jwtLoaded = false;
  }
  res.json({
    service: 'shop-api',
    version: process.env.APP_VERSION || '1.0.0',
    failWorker: process.env.FAIL_WORKER || 'false',
    jwtLoaded
  });
});

app.use('/products', productsRouter);
app.use('/carts', cartsRouter);
app.use('/orders', ordersRouter);
app.use('/admin', adminRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'internal_error', detail: err.message });
});

app.listen(port, () => {
  console.log(`shop-api listening on ${port}`);
});
