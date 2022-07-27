const Product = require('../models/product.model');

async function getAllProducts(req, res, next) {
  try {
    const products = await Product.findAll();
    res.render('customer/products/all-products', { products });
  } catch (error) {
    next(error);
  }
}

async function getProductDetails(req, res, next) {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    res.render('customer/products/product-details', { product });
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllProducts, getProductDetails };
