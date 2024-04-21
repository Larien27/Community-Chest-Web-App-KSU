const db = require('../database');
const templates = require('../templates');

function boxLocations(req, res) {
  var boxes = db.prepare("SELECT * FROM boxes").all();
  var boxHtml = templates['card-container.html']({boxes: boxes});
  var title = "MHK Community Chest";
  var html = templates['layout.html']({boxes: boxHtml, title: title, user: req.session.user});
  res.setHeader('Content-Type', "text/html");
  res.setHeader('Content-Length', html.length);
  res.end(html);
}

module.exports = boxLocations;