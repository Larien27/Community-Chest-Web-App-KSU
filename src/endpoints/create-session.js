const bcrypt = require('bcrypt');
const templates = require('../templates');
const db = require('../database');
const serveError = require('../serve-error');

function createSession(req, res) {
  var username = req.body.name;
  var password = req.body.password;

  var user = db.prepare("SELECT * FROM User WHERE name = ?").get(username);
  if(!user) return failure(req, res, "Username/Password not found.  Please try again.");

  bcrypt.compare(password, user.password, (err, result) => {
    if(err) return serveError(req, res, 500, err);
    if(result) success(req, res, user);
    else return failure(req, res, "Username/Password not found. Please try again.");
  });
}

function success(req, res, user) {
  res.end(`Welcome ${user.name}.  You logged in successfully!`);
}

function failure(req, res, errorMessage) {
  if(!errorMessage) errorMessage = "There was an error processing your request.  Please try again."
  var form = templates["signin.html"]({
    errorMessage: errorMessage
  });
  var html = templates["layout.html"]({
    title: "Sign In",
    boxes: form
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}

module.exports = createSession;