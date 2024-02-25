const path = require('path');

/** @function pathToMimeType
 * Converts the supplied file path string to
 * the corresponding MIME-TYPE
 * @param {string} filePath - the file path
 * @returns {string} the corresponding MIME-TYPE
 */
function pathToMimeType(filePath) {
  var extension = path.extname(filePath);
  switch(extension) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "text/javascript";
    case ".json":
      return "application/json";
    case ".png":
      return "image/png";
    default:
      return "application/octet-stream";
  }
}

module.exports = pathToMimeType;