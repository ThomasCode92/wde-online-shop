function addCartItem(req, res, next) {
  res.locals.cart.addItem();
}

module.exports = { addCartItem };
