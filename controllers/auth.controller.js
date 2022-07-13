const {
  createUserSession,
  destroyUserAuthSession,
} = require('../util/authentication');
const { userDetailsAreValid, emailIsConfirmed } = require('../util/validation');
const { getSessionData, flashDataToSession } = require('../util/session-flash');

const User = require('../models/user.model');

function getSignup(req, res) {
  res.render('customer/auth/signup');
}

async function signup(req, res, next) {
  const { email, password, fullname, street, postal, city } = req.body;
  const confirmedEmail = req.body['confirm-email'];

  const enteredData = {
    email,
    confirmedEmail,
    password,
    fullname,
    street,
    postal,
    city,
  };

  if (
    !userDetailsAreValid(email, password, fullname, street, postal, city) ||
    !emailIsConfirmed(password, confirmedEmail)
  ) {
    return flashDataToSession(
      req,
      {
        errorMessage: 'Please check your input!',
        enteredData,
      },
      function () {
        res.redirect('/auth/signup');
      }
    );
  }

  try {
    const existingUser = await User.getUser(email);

    if (existingUser) {
      return flashDataToSession(
        req,
        {
          errorMessage: 'User exists already! Try logging in instead!',
          enteredData,
        },
        function () {
          res.redirect('/auth/signup');
        }
      );
    }

    const user = new User(email, password, fullname, street, postal, city);
    await user.signup();
  } catch (error) {
    return next(error);
  }

  res.redirect('/auth/login');
}

function getLogin(req, res) {
  res.render('customer/auth/login');
}

async function login(req, res, next) {
  const { email, password } = req.body;

  const sessionErrorData = {
    errorMessage: 'Invalid credentials - please check your email and password!',
    enteredData: { email, password },
  };

  let user;

  try {
    user = await User.getUser(email);
  } catch (error) {
    return next(error);
  }

  if (!user) {
    return flashDataToSession(req, sessionErrorData, function () {
      res.redirect('/auth/login');
    });
  }

  const passwordIsCorrect = await User.hasMatchingPassword(
    password,
    user.password
  );

  if (!passwordIsCorrect) {
    return flashDataToSession(req, sessionErrorData, function () {
      res.redirect('/auth/login');
    });
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
