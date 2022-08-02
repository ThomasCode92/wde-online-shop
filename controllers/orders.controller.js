const createOrders = require('../util/orders');

const Order = require('../models/order.model');

async function getOrders(req, res, next) {
  const { userId } = res.locals;

  try {
    const orders = await Order.findAll(userId);
    const orderDocuments = createOrders(orders);

    res.render('customer/orders/all-orders', { orders: orderDocuments });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  const { cart, userId } = res.locals;

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
