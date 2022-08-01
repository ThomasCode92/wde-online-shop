const express = require('express');

const ordersController = require('../controllers/orders.controller');

const router = express.Router();

router
  .route('/')
  .get(ordersController.getOrders)
  .post(ordersController.addOrder);

module.exports = router;
