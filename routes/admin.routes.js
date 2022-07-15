const express = require('express');

const imageUpload = require('../middleware/image-upload');

const adminController = require('../controllers/admin.controller');

const router = express.Router();

router.get('/products/new', adminController.getNewProduct);

router
  .route('/products')
  .get(adminController.getProducts)
  .post(imageUpload, adminController.createNewProduct);

module.exports = router;
