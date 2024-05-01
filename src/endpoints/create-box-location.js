const db = require('../database');
const sanitizeHTML = require('sanitize-html');
const serveError = require('../serve-error');

function createBoxLocation(req, res) {
  var name = req.body.name;
  var lat = req.body.lat;
  var lng = req.body.lng;
  name = sanitizeHTML(name);
  lat = sanitizeHTML(lat);
  lng = sanitizeHTML(lng);

  if(!name || !lat || !lng) return serveError(req, res, 422, "Empty input encountered");

  var info = db.prepare("INSERT INTO boxes (name, lat, lng) VALUES (?, ?, ?)").run(name, lat, lng);
  if(info.changes != 1) return serveError(req, res, 500, `Unable to insert ${name}, ${lat}, ${lng} into boxes`);

  var locationId = db.prepare("SELECT last_insert_rowid() AS id").get().id;
  res.writeHead(302, {"Location": `/box-details/${locationId}`}).end(); 
}

module.exports = createBoxLocation;