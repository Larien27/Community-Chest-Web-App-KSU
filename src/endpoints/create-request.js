const db = require('../database');
const sanitizeHTML = require('sanitize-html');
const serveError = require('../serve-error');

function createRequest(req, res) {
  var boxId = req.body.boxId;
  var userId = req.session.user.id;
  var request = req.body.request;
  var fulfilled = 0;
  request = sanitizeHTML(request);

  if(!request) return serveError(req, res, 422, "Empty request encountered");

  var info = db.prepare("INSERT INTO REQUESTS (box_id, request, fulfilled, user_id) VALUES (?, ?, ?, ?)").run(boxId, request, fulfilled, userId);
  if(info.changes != 1) return serveError(req, res, 500, `Unable to insert ${boxId}, ${request}, ${fulfilled} into requests`);
  res.writeHead(302, {"Location": `/box-locations/${boxId}`}).end(); 
}

module.exports = createRequest;