/*function loadCookieSession(req, res, next) {
  var sessionCookie = req.cookies.session;
  var sessionJSON = decodeURIComponent(sessionCookie);
  var session = JSON.parse(sessionJSON);
  
  req.session = session;
  next();
}

module.exports = loadCookieSession;*/