const sessions = require('../sessions');

function loadSession(req, res, next) {
  var match = /SID=([^;\s]+)/.exec(req.headers.cookie);
  if(!match) {
    req.session = {}
    next();
    return;
  } else {
    var session = sessions.get(match[1]);
    req.session = session;
    next();
  }
}

module.exports = loadSession;