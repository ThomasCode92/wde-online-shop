const express = require('express');

const cartController = require('../controllers/cart.controller');

const router = express.Router();

router.get('/', cartController.getCart);

router
  .route('/items')
  .post(cartController.addCartItem)
  .patch(cartController.updateCartItem);

module.exports = router;
