const bcrypt = require('bcrypt');
const templates = require('../templates');
const db = require('../database');
const serveError = require('../serve-error');

function createUser(req, res) {
  var email = req.body.email;
  var username = req.body.name;
  var password = req.body.password;
  var passwordConfirmation = req.body.passwordConfirmation;

  if(password !== passwordConfirmation) return failure(req, res, "Your password and password confirmation must match.");

  var existingUser = db.prepare("SELECT * FROM User WHERE name = ?").get(username);
  if(existingUser) return failure(req, res, `The username "${username}" is already taken.`);

  const passes = 10;
  bcrypt.hash(password, passes, (err, hash) => {
    if(err) return serveError(req, res, 500, err);
    var info = db.prepare("INSERT INTO User (email, name, password) VALUES (?, ?, ?);").run(email, username, hash);
    if(info.changes === 1) success(req, res);
    else failure(req, res, "An error occurred.  Please try again.");
  });
}

function success(req, res, userID) {
  res.end("Logged In");
}

function failure(req, res, errorMessage) {
  if(!errorMessage) errorMessage = "There was an error processing your request.  Please try again."
  var form = templates["signup.html"]({
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

module.exports = createUser;