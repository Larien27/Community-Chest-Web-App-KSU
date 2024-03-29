const db = require('../database');
const sanitizeHTML = require('sanitize-html');
const serveError = require('../serve-error');

function createRequest(req, res) {
  //var boxId = req.body.boxId;
  var boxId = 0;
  var request = req.body.request;
  var fulfilled = 0;
  request = sanitizeHTML(request);

  if(!request) return serveError(req, res, 422, "Empty request encountered");

  var info = db.prepare("INSERT INTO REQUESTS (boxId, request, fulfilled) VALUES (?, ?, ?)").run(boxId, request, fulfilled);
  if(info.changes != 1) return serveError(req, res, 500, `Unable to insert ${boxId}, ${request}, ${fulfilled} into requests`);
    res.writeHead(302, {"Location": `box-locations/${boxId}/requests`}).end(); 
}

module.exports = createRequest;