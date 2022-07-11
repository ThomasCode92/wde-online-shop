const express = require('express');

const router = express.Router();

router.route('/').get(function (req, res, next) {
  res.redirect('/products');
});

module.exports = router;
