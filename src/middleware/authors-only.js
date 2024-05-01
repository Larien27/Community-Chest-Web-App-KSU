const serveError = require('../serve-error');

function authorsOnly(req, res, next) {
  var session = req.session;
  if(!req.session.user) return res.writeHead(302, {Location: "/signin"}).end();
  if(req.session.user.admin === 1) next();
  else serveError(req, res, 403, `User with role ${req.session.user.admin} attempted to use an author-only route`);
}

module.exports = authorsOnly;