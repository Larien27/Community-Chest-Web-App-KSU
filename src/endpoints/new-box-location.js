const templates = require('../templates');

module.exports = function(req, res) {
  var form = templates["new-box-location.html"]();
  var html = templates["layout.html"]({boxes: form, title: "New Box Location", user: req.session.user});
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}