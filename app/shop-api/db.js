const mariadb = require('mariadb');

let pool;

function getPool() {
  if (!pool) {
    pool = mariadb.createPool({
      host: process.env.DB_HOST || 'mariadb',
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || 'shop',
      password: process.env.DB_PASSWORD || 'shoppass',
      database: process.env.DB_NAME || 'shop',
      connectionLimit: 5
    });
  }
  return pool;
}

async function query(sql, params = []) {
  const conn = await getPool().getConnection();
  try {
    return await conn.query(sql, params);
  } finally {
    conn.release();
  }
}

module.exports = { query };
