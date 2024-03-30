const templates = require('../templates');

function newRequest(req, res) {
  var form = templates["new-request.html"]({boxId: boxId});
  var html = templates["layout.html"]({card: form, title: "New Request"})
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", "text/html");
  res.end(html);
}

module.exports = newRequest;