const Product = require('../models/product.model');

async function getProducts(req, res, next) {
  try {
    const products = await Product.findAll();
    res.render('admin/products/all-products', { products });
  } catch (error) {
    return next(error);
  }
}

function getNewProduct(req, res) {
  res.render('admin/products/new-product');
}

async function createNewProduct(req, res, next) {
  const { title, summary, price, description } = req.body;
  const image = req.file;

  const product = new Product({ title, summary, description, price, image });

  try {
    await product.save();
  } catch (error) {
    return next(error);
  }

  res.redirect('/admin/products');
}

async function getUpdateProduct(req, res, next) {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    res.render('admin/products/update-product', { product });
  } catch (error) {
    return next(error);
  }
}

async function updateProduct(req, res, next) {
  const productId = req.params.id;

  const { title, summary, price, description } = req.body;
  const image = req.file;

  const updatedProductData = {
    title,
    summary,
    description,
    price,
    image,
  };

  try {
    await Product.findByIdAndUpdate(productId, updatedProductData);
    res.redirect('/admin/products');
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getProducts,
  getNewProduct,
  createNewProduct,
  getUpdateProduct,
  updateProduct,
};
