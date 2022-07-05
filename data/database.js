const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'database',
  database: 'wde_online_shop',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

module.exports = pool;
