const { cloudinary } = require('../config/cloudinary');

const db = require('../data/database');

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = parseFloat(productData.price);
    this.description = productData.description;
    this.image = productData.image;
  }

  static async findAll() {
    const [results] = await db.getDb().query(
      `SELECT p.id AS id, title, summary, price, description, path AS imageUrl
      FROM products AS p
      LEFT JOIN images AS i ON p.id = i.product_id;`
    );

    return results;
  }

  static async findById(productId) {
    const [results] = await db.getDb().query(
      `SELECT p.id AS id, title, summary, price, description, path AS imageUrl
      FROM products AS p
      LEFT JOIN images AS i ON p.id = i.product_id
      WHERE p.id = ?;`,
      [productId]
    );

    const product = results[0];

    if (!product) {
      const error = new Error('Could not found product with provided id.');
      error.statusCode = 404;
      throw error;
    }

    product.price = parseFloat(product.price);

    return product;
  }

  static async findByIdAndUpdate(productId, productData) {
    const product = await this.findById(productId);

    const title = productData.title ? productData.title : product.title;
    const summary = productData.summary ? productData.summary : product.summary;
    const price = productData.price ? productData.price : product.price;
    const description = productData.description
      ? productData.description
      : product.description;

    await db.getDb().query(
      `UPDATE products
      SET title = ?, summary = ?, price = ?, description = ?
      WHERE id = ?;`,
      [title, summary, parseFloat(price), description, productId]
    );

    // Replace the old image
    if (productData.image) {
      await this.#updateImageData(productId, productData.image);
    }
  }

  async save() {
    const [result] = await db.getDb().query(
      `INSERT INTO products (title, summary, price, description)
      VALUES (?, ?, ?, ?);`,
      [this.title, this.summary, this.price, this.description]
    );

    await db.getDb().query(
      `INSERT INTO images (original_name, path, filename, product_id)
      VALUES (?, ?, ?, ?)`,
      [
        this.image.originalname,
        this.image.path,
        this.image.filename,
        result.insertId,
      ]
    );
  }

  static async #updateImageData(productId, imageData) {
    // Select all images for a product
    const [results] = await db.getDb().query(
      `SELECT filename FROM images
      WHERE product_id = ?`,
      [productId]
    );

    if (results && results.length > 0) {
      const { filename } = results[0];

      // Delete image from the database
      await db.getDb().query(
        `DELETE FROM images
        WHERE product_id = ? AND filename = ?`,
        [productId, filename]
      );

      // Delete image from Cloudinary
      await cloudinary.uploader.destroy(filename);
    }

    // Insert new image
    await db.getDb().query(
      `INSERT INTO images (original_name, path, filename, product_id)
      VALUES (?, ?, ?, ?)`,
      [imageData.originalname, imageData.path, imageData.filename, productId]
    );
  }
}

module.exports = Product;
