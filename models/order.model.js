class Order {
  // Status => pending, fulfilled, cancelled
  constructor(cart, userData, status = 'pending', date, orderId) {
    this.productData = cart;
    this.userData = userData;
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
}

module.exports = Order;
