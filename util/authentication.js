function createUserSession(req, user, action) {
  req.session.userId = user.id.toString();
  req.session.save(action);
}

module.exports = { createUserSession };
