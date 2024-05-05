const db = require('../database');
const templates = require('../templates');

function usersDisplay(req, res) {
  var users = db.prepare("SELECT * FROM User").all();
  var usersHtml = templates['users-table.html']({users: users});
  var title = "Users";
  var html = templates['layout.html']({boxes: usersHtml, title: title, user: req.session.user});
  res.setHeader('Content-Type', "text/html");
  res.setHeader('Content-Length', html.length);
  res.end(html);
}

module.exports = usersDisplay;