SELECT p.id AS id, title, summary, price, description, path AS imageUrl
FROM products AS p
LEFT JOIN images AS i ON p.id = i.product_id;
