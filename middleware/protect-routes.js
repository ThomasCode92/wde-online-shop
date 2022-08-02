function protectRoutes(req, res, next) {
  if (!res.locals.isAuth) {
    return res.redirect('/401');
  }

  if (req.originalUrl.startsWith('/admin') && res.locals.isAdmin === 0) {
    return res.redirect('/403');
  }

  next();
}

module.exports = protectRoutes;
