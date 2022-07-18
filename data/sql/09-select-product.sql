SELECT p.id AS id, title, summary, price, description, path AS imageUrl
FROM images AS i
INNER JOIN products AS p ON i.product_id = p.id
AND p.id = 2;
