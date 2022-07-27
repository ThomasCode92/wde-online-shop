const Cart = require('../models/cart.model');

function initializeCart(req, res, next) {
  let cart;

  if (!req.session.cart) {
    cart = new Cart();
  } else {
    const cartItems = req.session.cart.items;
    cart = new Cart(cartItems);
  }

  res.locals.cart = cart;
  next();
}

module.exports = initializeCart;
