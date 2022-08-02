const db = require('../data/database');

class Order {
  // Status => pending, fulfilled, cancelled
  constructor(cart, userId, status = 'pending', date = new Date(), orderId) {
    this.productData = cart;
    this.userId = parseInt(userId);
    this.status = status;
    this.date = new Date(date);
  }

  static async findAll(userId) {
    const baseQuery = `
      SELECT
        o.id, o.total_quantity AS orderTotalQuantity,
        o.total_price AS orderTotalPrice, date, current_status AS currentStatus,
        u.id AS userId, u.email, u.full_name AS fullname,
        a.street, a.postal_code AS postalCode, a.city,
        p.id AS productId, p.title, p.price AS productPrice,
        op.total_quantity AS productTotalQuantity, op.total_price AS productTotalPrice
      FROM orders AS o
      INNER JOIN orders_products AS op ON op.order_id = o.id
      INNER JOIN products AS p ON op.product_id = p.id
      INNER JOIN users AS u ON o.user_id = u.id
      INNER JOIN addresses AS a on a.id = u.address_id`;

    if (userId) {
      const [results] = await db
        .getDb()
        .query(baseQuery + ' WHERE user_id = ?;', [userId]);

      return results;
    } else {
      const [results] = await db.getDb().query(baseQuery + ';');
      return results;
    }
  }

  static async changeStatus(orderId, newStatus) {
    await db.getDb().query(
      `UPDATE orders
      SET current_status = ?
      WHERE id = ?;`,
      [newStatus, orderId]
    );
  }

  async save() {
    const orderData = [
      this.productData.totalQuantity,
      this.productData.totalPrice,
      this.date,
      this.status,
      this.userId,
    ];

    const [result] = await db.getDb().query(
      `INSERT INTO orders (total_quantity, total_price, date, current_status, user_id)
        VALUES (?);`,
      [orderData]
    );

    const orderId = result.insertId;
    const orderProducts = [];

    for (const item of this.productData.items) {
      const productData = [
        orderId,
        item.product.id,
        item.quantity,
        item.totalPrice,
      ];

      const result = await db.getDb().query(
        `INSERT INTO orders_products (order_id, product_id, total_quantity, total_price)
          VALUES (?);`,
        [productData]
      );

      orderProducts.push(result);
    }

    await Promise.all(orderProducts);
  }
}

module.exports = Order;
