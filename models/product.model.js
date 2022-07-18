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
      FROM images AS i
      INNER JOIN products AS p ON i.product_id = p.id;`
    );

    console.log(results);

    return results;
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
}

module.exports = Product;
