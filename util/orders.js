function createOrders(orders) {
  const orderDocuments = orders.reduce(function (previousArray, currentValue) {
    let orderExists = false;

    previousArray.forEach((orderDocument) => {
      if (orderDocument.id === currentValue.id) {
        orderExists = true;

        orderDocument.items.push({
          productId: currentValue.productId,
          title: currentValue.title,
          productPrice: parseFloat(currentValue.productPrice),
          quantity: currentValue.productTotalQuantity,
          totalPrice: parseFloat(currentValue.productTotalPrice),
        });
      }
    });

    if (!orderExists) {
      const order = {
        id: currentValue.id,
        user: {
          userId: currentValue.userId,
          email: currentValue.email,
          name: currentValue.fullname,
          street: currentValue.street,
          postalCode: currentValue.postalCode,
          city: currentValue.city,
        },
        totalQuantity: currentValue.orderTotalQuantity,
        totalPrice: parseFloat(currentValue.orderTotalPrice),
        date: new Date(currentValue.date),
        status: currentValue.currentStatus,
        items: [],
      };

      order.date = order.date.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      order.items.push({
        productId: currentValue.productId,
        title: currentValue.title,
        productPrice: parseFloat(currentValue.productPrice),
        quantity: currentValue.productTotalQuantity,
        totalPrice: parseFloat(currentValue.productTotalPrice),
      });

      previousArray.push(order);
    }

    return previousArray;
  }, []);

  return orderDocuments;
}

module.exports = createOrders;
