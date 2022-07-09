SELECT *
FROM users AS u
INNER JOIN addresses AS a ON u.address_id = a.id;