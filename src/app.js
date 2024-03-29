const express = require('express');
const serveHomepage = require('./endpoints/serve-homepage');
const newRequest = require('./endpoints/new-request');
const createRequest = require('./endpoints/create-request');
const loadBody = require('./middleware/load-body');
const showRequest = require('./endpoints/show-request');
//const showBoxLocation = require('./show-box-location');

var app = express();

app.get(['/', '/box-locations'], serveHomepage);
app.get('/box-locations/:id/requests', newRequest);
app.get('/box-locations/:id', showRequest);
//app.get('/box-locations/:id', showBoxLocation);
//app.post('/box-locations', loadBody, createRequest);
app.use(express.static('static'));

module.exports = app;