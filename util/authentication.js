function createUserSession(req, user, action) {
  req.session.userId = user.id.toString();
  req.session.isAdmin = user.is_admin;
  req.session.save(action);
}

function destroyUserAuthSession(req) {
  req.session.userId = null;
}

module.exports = { createUserSession, destroyUserAuthSession };
