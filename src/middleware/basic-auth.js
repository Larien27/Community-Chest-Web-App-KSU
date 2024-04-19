const bcrypt = require('bcrypt');
const db = require('../database');
const serveError = require('../serve-error');

function basicAuth(req, res, next) {
  if(!req.headers['authorization']) {
    res.writeHead(401, {
      'WWW-Authenticate': 'Basic realm=Creating posts'
    }).end();
  } else {
    var encodedCredentials = req.headers['authorization'].split(' ')[1];
    var buffer = new Buffer(encodedCredentials, "base64");
    var credentialString = buffer.toString("utf-8");
    
    var credentials = credentialString.split(':');
    var username = credentials[0];
    var password = credentials[1];

    var user = db.prepare("SELECT * FROM User WHERE name = ?").get(username);
    if(!user) return res.writeHead(403).end();
    
    bcrypt.compare(password, user.password, function(err, result) {
      if(err) return serveError(req, res, 500, err);
      if(result) next();
      else res.writeHead(403).end();
    });
  }
}

module.exports = basicAuth;