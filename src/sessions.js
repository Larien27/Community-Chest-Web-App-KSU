const {v1: uuidv1} = require('uuid');

var sessions = {}

function generateUUID() {
  var uuid = uuidv1();
  while(sessions[uuid]) {uuid = uuidv1()}
  return uuid;
}

function createSession(user) {
  var sid = generateUUID();
  sessions[sid] = {
    timestamp: Date.now(),
    user: {
      id: user.id,
      username: user.username
    },
    data: {}
  }
  return sid;
}

function getSession(sid) {
  if(sessions[sid]) {
    return JSON.parse(JSON.stringify(sessions[sid]));
  } else {
    return false;
  }
}

function removeSession(sid) {
  delete sessions[sid];
}

module.exports = {
  create: createSession,
  get: getSession,
  remove: removeSession
}