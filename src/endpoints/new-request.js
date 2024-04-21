const templates = require('../templates');

function newRequest(req, res) {
  var form = templates["new-request.html"]({boxId: boxId});
  var html = templates["layout.html"]({boxes: form, title: "New Request", user: req.session.user});
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", "text/html");
  res.end(html);
}

module.exports = newRequest;