const templates = require('../templates');
const db = require('../database');

function showLocation(req, res) {
  const id = parseInt(req.params.id, 10);
  var box = db.prepare("SELECT * FROM boxes WHERE id = ?").get(id);
  var requests = db.prepare("SELECT * FROM requests WHERE box_id = ?").all(id);
  var requestForm = templates["new-request.html"]({boxId: id});
  
  var location = templates["location.html"]({box: box, requests: requests, requestForm: requestForm, user: req.session.user});
  var html = templates["layout.html"]({title: box.name, boxes: location, user: req.session.user});
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}

module.exports = showLocation;