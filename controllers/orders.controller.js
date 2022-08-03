const stripe = require('stripe')(process.env.STRIPE_API_KEY);

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

  const session = await stripe.checkout.sessions.create({
    line_items: cart.items.map(function (item) {
      return {
        price_data: {
          currency: 'usd',
          unit_amount: parseInt(item.product.price.toFixed(2) * 100),
          product_data: {
            name: item.product.title,
          },
        },
        quantity: item.quantity,
      };
    }),
    mode: 'payment',
    success_url: 'http://localhost:3000/orders/success',
    cancel_url: 'http://localhost:3000/orders/failure',
  });

  res.redirect(303, session.url);

  // res.redirect('/orders');
}

function getSuccess(req, res, next) {
  res.render('customer/orders/success');
}

function getFailure(req, res, next) {
  res.render('customer/orders/failure');
}

module.exports = { getOrders, addOrder, getSuccess, getFailure };
