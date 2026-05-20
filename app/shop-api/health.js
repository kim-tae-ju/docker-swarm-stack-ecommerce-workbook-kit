const db = require('./db');
const { getRedis } = require('./redis');

async function healthSummary() {
  let dbOk = false;
  let redisOk = false;
  try {
    await db.query('SELECT 1 AS ok');
    dbOk = true;
  } catch (e) {
    dbOk = false;
  }
  try {
    const redis = await getRedis();
    await redis.ping();
    redisOk = true;
  } catch (e) {
    redisOk = false;
  }
  return { status: dbOk && redisOk ? 'ok' : 'degraded', dbOk, redisOk };
}

module.exports = { healthSummary };
