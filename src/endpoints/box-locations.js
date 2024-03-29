const db = require('../database');
const templates = require('../templates');

/** @function homepage
 * Serves the home page 
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */
function boxLocations(req, res) {
  var boxes = db.prepare("SELECT * FROM boxes").all();
  var boxHtml = templates['card-container.html']({boxes: boxes});
  var title = "MHK Community Chest: " + boxes.name;
  var html = templates['layout.html']({boxes: boxHtml, name: boxes.name});
  res.setHeader('Content-Type', "text/html");
  res.setHeader('Content-Length', html.length);
  res.end(html);
}

module.exports = boxLocations;