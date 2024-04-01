const templates = require('../templates');
const db = require('../database');

function showLocation(req, res) {
  const id = parseInt(req.params.id, 10);
  var box = db.prepare("SELECT * FROM boxes WHERE id = ?").get(id);
  var requests = db.prepare("SELECT * FROM requests WHERE box_id = ?").all(id);
  var form = templates["new-request.html"]({boxId: id});
  
  var location = templates["location.html"]({box: box, requests: requests, requestForm: form});
  var html = templates["layout.html"]({title: box.name, boxes: location});
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}

module.exports = showLocation;