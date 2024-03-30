const templates = require('../templates');
const db = require('../database');

function showLocation(req, res) {
  const id = parseInt(req.params.id, 10);
  var box = db.prepare("SELECT * FROM boxes WHERE id = ?").get(id);
  var requests = db.prepare("SELECT * FROM requests WHERE box_id = ?").all(id);
  var form = templates["new-request.html"]({boxId: id});
  
  /* DEBUG */
  const currentTime = new Date();
  console.log(currentTime);
  const path = require('path');
  console.log(path.basename(__filename));
  
  console.log(box);
  console.log("Lat: " + box.lat);
  console.log("Lng: " + box.lng);
  console.log("Name: " + box.name);
  console.log("ID: " + box.id);
  /* END OF DEBUG */
  
  var location = templates["location.html"]({box: box, requests: requests, requestForm: form});
  var html = templates["layout.html"]({title: box.name, boxes: location});
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}

module.exports = showLocation;