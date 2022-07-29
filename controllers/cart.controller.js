const Product = require('../models/product.model');

function getCart(req, res, next) {
  res.render('customer/cart/cart');
}

async function addCartItem(req, res, next) {
  const { productId } = req.body;
  const { cart } = res.locals;

  let product;

  try {
    product = await Product.findById(productId);
  } catch (error) {
    return next(error);
  }

  cart.addItem(product);
  req.session.cart = cart;

  res.status(201).json({
    message: 'Cart updated successfully!',
    newTotalItems: cart.totalQuantity,
  });
}

function updateCartItem(req, res, next) {
  const { productId, quantity } = req.body;
  const { cart } = res.locals;

  const updatedItemData = cart.updateItem(parseInt(productId), quantity);

  req.session.cart = cart;

  res.status(201).json({
    message: 'Cart updated successfully!',
    updatedCartData: {
      newTotalQuantity: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
      updatedItemPrice: updatedItemData.updatedItemPrice,
    },
  });
}

module.exports = { getCart, addCartItem, updateCartItem };
