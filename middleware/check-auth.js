function checkAuthStatus(req, res, next) {
  const { userId, isAdmin } = req.session;

  if (!userId) return next();

  res.locals.userId = userId;
  res.locals.isAuth = true;
  res.locals.isAdmin = isAdmin;

  next();
}

module.exports = checkAuthStatus;
