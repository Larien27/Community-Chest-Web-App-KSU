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
const destroySession = require('./endpoints/destroy-session');
const newBoxLocation = require('./endpoints/new-box-location');
const createBoxLocation = require('./endpoints/create-box-location');
const authorsOnly = require('./middleware/authors-only');
const users = require('./endpoints/users');
const fulfillRequest = require('./endpoints/fulfill-request');
const editUser = require('./endpoints/edit-user');
const updateUser = require('./endpoints/update-user');

var app = express();

app.use(loadSession);

app.get('/', boxLocations);
app.get('/signup', newUser);
app.get('/signin', newSession);
app.get('/signout', destroySession);
app.get('/box-details/:id', showLocation);
app.get('/box-locations/create', authorsOnly, newBoxLocation);
app.get('/users', authorsOnly, users);
// basicAuth not working?
app.get('/box-locations/:box_id/requests/:request_id/fulfill', basicAuth, fulfillRequest);
app.get('/users/:user_id', authorsOnly, editUser);

app.post('/signup', parseBody, createUser);
app.post("/signin", parseBody, createSession);
app.post('/box-details/:id/requests', basicAuth, parseBody, createRequest);
app.post('/box-locations/create', authorsOnly, parseBody, createBoxLocation);
app.post('/users/:user_id', authorsOnly, parseBody, updateUser);

app.use(express.static('static'));

module.exports = app;