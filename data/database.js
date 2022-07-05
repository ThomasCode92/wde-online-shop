const mysql = require('mysql2/promise');

let database;

async function connectToDatabase() {
  const pool = mysql.createPool({
    host: 'database',
    database: 'wde_online_shop',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  database = await pool.getConnection();
}

function getDb() {
  if (!database) {
    throw new Error('You must connect first!');
  }

  return database;
}

module.exports = { connectToDatabase, getDb };
