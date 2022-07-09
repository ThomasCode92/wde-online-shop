const User = require('../models/user.model');

function getSignup(req, res) {
  res.render('customer/auth/signup');
}

async function signup(req, res) {
  const { email, confirmEmail, password, fullname, street, postal, city } =
    req.body;

  const user = new User(email, password, fullname, street, postal, city);
  await user.signup();

  res.redirect('/auth/login');
}

function getLogin(req, res) {
  res.render('customer/auth/login');
}

module.exports = {
  getSignup,
  getLogin,
  signup,
};
