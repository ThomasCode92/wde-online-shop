const express = require('express');

const authController = require('../controllers/auth.controller');

const router = express.Router();

router
  .route('/signup')
  .get(authController.getSignup)
  .post(authController.signup);

router.route('/login').get(authController.getLogin).post(authController.login);

router.post('/logout', authController.logout);

module.exports = router;
