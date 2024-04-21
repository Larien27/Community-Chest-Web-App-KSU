const sessions = require('../sessions');

function destroySession(req, res) {
  var match = /SID=([^;\s]+)/.exec(req.headers.cookie);
  if(match) sessions.remove(match[1]);
  res.setHeader("Set-Cookie", `SID=deleted; Secure; HTTPOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
  res.statusCode = 302;
  res.setHeader("Location", "/");
  res.end();
}

module.exports = destroySession;