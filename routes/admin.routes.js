const express = require('express');

const imageUpload = require('../middleware/image-upload');

const adminController = require('../controllers/admin.controller');

const router = express.Router();

router.get('/products/new', adminController.getNewProduct);

router
  .route('/products/:id')
  .get(adminController.getUpdateProduct)
  .post(imageUpload, adminController.updateProduct)
  .delete(adminController.deleteProduct);

router
  .route('/products')
  .get(adminController.getProducts)
  .post(imageUpload, adminController.createNewProduct);

router.get('/orders', adminController.getOrders);

router.patch('/orders/:id', adminController.updateOrder);

module.exports = router;
