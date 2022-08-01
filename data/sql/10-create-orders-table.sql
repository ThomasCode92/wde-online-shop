CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  total_quantity INT NOT NULL,
  total_price DECIMAL(7,2) NOT NULL,
  date DATE NOT NULL,
  current_status ENUM ('pending', 'fulfilled', 'cancelled') NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE orders_products (
  order_id INT,
  product_id INT,
  total_quantity INT NOT NULL,
  total_price DECIMAL(7,2) NOT NULL,
  PRIMARY KEY (order_id, product_id)
);
