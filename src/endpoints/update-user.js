const templates = require('../templates');
const db = require('../database');
const serveError = require('../serve-error');

function updateUser(req, res) {
  var id = req.body.id;
  var email = req.body.email;
  var name = req.body.name;
  var admin = req.body.admin ? 1 : 0;

  var info = db.prepare("UPDATE User SET email = ?, name = ?, admin = ? WHERE id = ?;").run(email, name, admin, id);
  if(info.changes != 1) return serveError(req, res, 500, `Unable to update ${id} in User`);

  res.writeHead(302, {"Location": `/users`}).end();
}

module.exports = updateUser;