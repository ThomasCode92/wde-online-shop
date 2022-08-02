SELECT
  o.id, o.total_quantity AS orderTotalQuantity,
  o.total_price AS orderTotalPrice, date, current_status AS currentStatus,
  u.id, u.email, u.full_name AS fullname,
  a.street, a.postal_code AS postalCode, a.city,
  p.id AS productId, p.title, p.price AS productPrice,
  op.total_quantity AS productTotalQuantity, op.total_price AS productTotalPrice
FROM orders AS o
INNER JOIN orders_products AS op ON op.order_id = o.id
INNER JOIN products AS p ON op.product_id = p.id
INNER JOIN users AS u ON o.user_id = u.id
INNER JOIN addresses AS a on a.id = u.address_id;
-- WHERE u.id = 3;
