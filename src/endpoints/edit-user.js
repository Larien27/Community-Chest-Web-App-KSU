const templates = require('../templates');
const db = require('../database');

module.exports = function(req, res) {
  const userID = req.params.user_id;
  var user = db.prepare("SELECT * FROM User WHERE id = ?").get(userID);

  var form = templates["edit-user.html"]({
    errorMessage: "",
    user: user
  });
  var html = templates["layout.html"]({
    title: "Edit User",
    boxes: form,
    user: req.session.user
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}