const db = require('../data/database');

class Order {
  // Status => pending, fulfilled, cancelled
  constructor(cart, userId, status = 'pending', date = new Date(), orderId) {
    this.productData = cart;
    this.userId = parseInt(userId);
    this.status = status;
    this.date = new Date(date);
    this.orderId = orderId;

    if (this.date) {
      this.formattedDate = this.date.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }
  }

  async save() {
    if (this.id) {
      // Updating...
    } else {
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
}

module.exports = Order;
