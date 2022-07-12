function checkAuthStatus(req, res, next) {
  const { userId } = req.session;

  if (!userId) return next();

  res.locals.userId = userId;
  res.locals.isAuth = true;

  next();
}

module.exports = checkAuthStatus;
