CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  summary VARCHAR(128) NOT NULL,
  price DECIMAL(7,2) NOT NULL,
  description VARCHAR(255) NOT NULL
);

CREATE TABLE images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  original_name VARCHAR(200) NOT NULL,
  path VARCHAR(255) NOT NULL,
  filename VARCHAR(200) NOT NULL,
  product_id INT,
  FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);