const serveFile = require('./serve-file');
const fs = require('fs');
const path = require('path');

/** @function handleRequest
 * Provides a function for handling HTTP requests
 * @param {http.incomingMessage} req - the request object
 * @param {http.serverResponse} res - the response object
 */
function handleRequest(req, res) {
  if (req.method !== 'GET') return res.writeHead(501).end();

  var pathname = new URL(req.url, 'http://localhost').pathname;
  if (pathname.endsWith('/')) {
    req.url = path.join(req.url, "index.html");
    serveFile(req, res);
    return;
  }

  fs.stat(path.join("static", pathname), (err, stat) => {
    if(err) return res.writeHead(404).end();
    if (stat.isFile()) return serveFile(req, res);
    return res.writeHead(404).end();
  });
}

module.exports = handleRequest;