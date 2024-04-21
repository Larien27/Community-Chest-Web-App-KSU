const express = require('express');
const boxLocations = require('./endpoints/box-locations');
const newRequest = require('./endpoints/new-request');
const createRequest = require('./endpoints/create-request');
const parseBody = require('./middleware/parse-body');
const showLocation = require('./endpoints/show-location');
const basicAuth = require('./middleware/basic-auth');
const newUser = require('./endpoints/new-user');
const createUser = require('./endpoints/create-user');
const newSession = require('./endpoints/new-session');
const createSession = require('./endpoints/create-session');
const parseCookie = require('./middleware/parse-cookie');
const loadSession = require('./middleware/load-session');

var app = express();

app.use(loadSession);

app.get(['/', '/box-locations'], boxLocations);
app.get("/signup", newUser);
app.get('/signin', newSession);
app.get('/box-locations/:id', showLocation);
app.post('/signup', parseBody, createUser);
app.post("/signin", parseBody, createSession);
app.post('/box-locations/:id/requests', basicAuth, parseBody, createRequest);

app.use(express.static('static'));

module.exports = app;