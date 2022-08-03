const express = require('express');

const ordersController = require('../controllers/orders.controller');

const router = express.Router();

router
  .route('/')
  .get(ordersController.getOrders)
  .post(ordersController.addOrder);

router.get('/success', ordersController.getSuccess);

router.get('/failure', ordersController.getFailure);

module.exports = router;
