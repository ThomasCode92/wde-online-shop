const {
  createUserSession,
  destroyUserAuthSession,
} = require('../util/authentication');

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

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.getUser(email);

  if (!user) {
    return res.redirect('/auth/login');
  }

  const passwordIsCorrect = await User.hasMatchingPassword(
    password,
    user.password
  );

  if (!passwordIsCorrect) {
    return res.redirect('/auth/login');
  }

  createUserSession(req, user, function () {
    res.redirect('/');
  });
}

function logout(req, res, next) {
  destroyUserAuthSession(req);
  res.redirect('/');
}

module.exports = {
  getSignup,
  getLogin,
  signup,
  login,
  logout,
};
