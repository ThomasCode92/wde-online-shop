const expressSession = require('express-session');
const mysqlDbStore = require('express-mysql-session');

const TWO_DAYS = 2 * 24 * 60 * 60 * 1000; // 2 days in ms

function createSessionStore() {
  const MySQLDbStore = mysqlDbStore(expressSession);

  const sessionStore = new MySQLDbStore({
    host: 'database',
    port: 3306,
    database: 'wde_online_shop',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  return sessionStore;
}

function createSessionConfig() {
  const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: TWO_DAYS,
    },
  };

  return sessionConfig;
}

module.exports = createSessionConfig;
