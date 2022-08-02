const path = require('path');

const express = require('express');
const expressSession = require('express-session');
const csurf = require('csurf');

const createSessionConfig = require('./config/session');
const addCsrfToken = require('./middleware/csrf-token');
const errorHandler = require('./middleware/error-handler');
const checkAuth = require('./middleware/check-auth');
const protectRoutes = require('./middleware/protect-routes');
const notFoundHandler = require('./middleware/not-found');
const { initializeCart, updateCartPrices } = require('./middleware/cart');

const db = require('./data/database');

const baseRoutes = require('./routes/base.routes');
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const productsRoutes = require('./routes/products.routes');
const cartRoutes = require('./routes/cart.routes');
const ordersRoutes = require('./routes/orders.routes');

const app = express();

const sessionConfig = createSessionConfig();

// Activate EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public')); // Serve static files (e.g. CSS files)
app.use(express.urlencoded({ extended: false })); // Parse incoming request bodies
app.use(express.json());

app.use(expressSession(sessionConfig));

app.use(csurf());
app.use(addCsrfToken);

app.use(checkAuth);
app.use(initializeCart);
app.use(updateCartPrices);

app.use('/', baseRoutes);
app.use('/auth', authRoutes);
app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', protectRoutes, ordersRoutes);
app.use('/admin', protectRoutes, adminRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

db.connectToDatabase()
  .then(function () {
    app.listen(3000, function () {
      console.log('Server connected to database!');
    });
  })
  .catch(function (error) {
    console.log('Failed to connect to the database!');
    console.log(error);
  });
