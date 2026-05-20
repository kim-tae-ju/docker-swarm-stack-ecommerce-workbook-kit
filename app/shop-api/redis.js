const { createClient } = require('redis');

let client;

async function getRedis() {
  if (!client) {
    client = createClient({
      url: `redis://${process.env.REDIS_HOST || 'redis'}:${process.env.REDIS_PORT || 6379}`
    });
    client.on('error', (err) => console.error('redis error', err.message));
    await client.connect();
  }
  return client;
}

module.exports = { getRedis };
