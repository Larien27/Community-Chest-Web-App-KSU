const db = require('../database');
const serveError = require('../serve-error');

function fulfillRequest(req, res) {
  var id = req.params.request_id;
  var locationId = req.params.box_id;
  var request = db.prepare("UPDATE requests SET fulfilled = 1 WHERE id = ?").run(id);
  if(request.changes != 1) return serveError(req, res, 500, `Unable to update ${id} in requests`);
  
  res.writeHead(302, {"Location": `/box-details/${locationId}`}).end();
}

module.exports = fulfillRequest;