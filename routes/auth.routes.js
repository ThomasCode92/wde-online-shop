const express = require('express');

const authController = require('../controllers/auth.controller');

const router = express.Router();

router
  .route('/signup')
  .get(authController.getSignup)
  .post(authController.signup);

router.get('/login', authController.getLogin);

module.exports = router;
