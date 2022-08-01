const Order = require('../models/order.model');

function getOrders(req, res, next) {
  res.render('customer/orders/all-orders');
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart;
  const userId = res.locals.userId;

  try {
    const order = new Order(cart, userId);
    await order.save();
  } catch (error) {
    next(error);
  }

  req.session.cart = null;

  res.redirect('/orders');
}

module.exports = { getOrders, addOrder };
