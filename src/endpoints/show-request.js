const templates = require('../templates');
const db = require('../database');

function showRequest(req, res) {
  const id = parseInt(req.params.id, 10);
  var request = db.prepare("SELECT * FROM requests WHERE id = ?").get(id);
  //request.date = new Date(request.date);
  var html = templates["request.html"](request);
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}

module.exports = showRequest;