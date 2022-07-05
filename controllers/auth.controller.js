function getSignup(req, res) {
  res.render('customer/auth/signup');
}

function signup(req, res) {}

function getLogin(req, res) {
  // ..
}

module.exports = {
  getSignup,
  getLogin,
  signup,
};
