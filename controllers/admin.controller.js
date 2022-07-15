const Product = require('../models/product.model');

function getProducts(req, res) {
  res.render('admin/products/all-products');
}

function getNewProduct(req, res) {
  res.render('admin/products/new-product');
}

async function createNewProduct(req, res) {
  const { title, summary, price, description } = req.body;
  const image = req.file;

  console.log(req.file);

  const product = new Product({ title, summary, description, price, image });

  try {
    await product.save();
  } catch (error) {
    return next(error);
  }

  res.redirect('/admin/products');
}

module.exports = { getProducts, getNewProduct, createNewProduct };
