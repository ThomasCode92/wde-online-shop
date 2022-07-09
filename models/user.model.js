const bcrypt = require('bcryptjs');

const db = require('../data/database');

class User {
  constructor(email, password, fullname, street, postal, city) {
    this.email = email;
    this.password = password;
    this.fullname = fullname;
    this.address = {
      street,
      postalCode: postal,
      city,
    };
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    const [result] = await db.getDb().query(
      `INSERT INTO addresses (street, postal_code, city)
      VALUES(?, ?, ?);`,
      [this.address.street, this.address.postalCode, this.address.city]
    );

    await db.getDb().query(
      `INSERT INTO users (email, password, full_name, address_id)
      VALUES (?, ?, ?, ?);`,
      [this.email, hashedPassword, this.fullname, result.insertId]
    );
  }
}

module.exports = User;
