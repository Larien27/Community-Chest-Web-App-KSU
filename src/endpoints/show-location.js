const templates = require('../templates');
const db = require('../database');

function showRequest(req, res) {
  const id = parseInt(req.params.id, 10);
  var box = db.prepare("SELECT * FROM boxes WHERE id = ?").get(id);
  var requests = db.prepare("SELECT * FROM requests WHERE box_id = ?").all(id);
  var requestHtml = templates["new-request.html"]({boxId: box.id});
  var html = templates["location.html"]({box: box, requests: requestHtml});
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}

module.exports = showRequest;