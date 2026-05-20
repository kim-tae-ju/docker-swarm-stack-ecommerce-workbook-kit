const { createClient } = require('redis');
const { markProcessed } = require('./jobs/orderProcessor');

async function main() {
  if (String(process.env.FAIL_WORKER || 'false') === 'true') {
    console.error('FAIL_WORKER=true, exiting intentionally');
    process.exit(1);
  }

  const client = createClient({
    url: `redis://${process.env.REDIS_HOST || 'redis'}:${process.env.REDIS_PORT || 6379}`
  });
  client.on('error', (err) => console.error('redis error', err.message));
  await client.connect();
  console.log('order-worker connected to redis');

  while (true) {
    try {
      const result = await client.blPop('orders', 0);
      if (!result || !result.element) continue;
      const payload = JSON.parse(result.element);
      console.log('processing order', payload.orderId);
      await new Promise(resolve => setTimeout(resolve, Number(process.env.WORKER_DELAY_MS || 1000)));
      await markProcessed(payload.orderId);
      console.log('processed order', payload.orderId);
    } catch (err) {
      console.error('worker loop error', err.message);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

main().catch((err) => {
  console.error('fatal worker error', err);
  process.exit(1);
});
