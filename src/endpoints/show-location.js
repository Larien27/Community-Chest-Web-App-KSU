const templates = require('../templates');
const db = require('../database');

function showRequest(req, res) {
  const id = parseInt(req.params.id, 10);
  var box = db.prepare("SELECT * FROM boxes WHERE id = ?").get(id);
  var html = templates["location.html"]({box: box});
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}

module.exports = showRequest;