const express = require('express');
const boxLocations = require('./endpoints/box-locations');
const newRequest = require('./endpoints/new-request');
const createRequest = require('./endpoints/create-request');
const parseBody = require('./middleware/parse-body');
const showLocation = require('./endpoints/show-location');

var app = express();

app.get(['/', '/box-locations'], boxLocations);
app.get('/box-locations/:id', showLocation);
app.post('/box-locations/:id/requests', parseBody, createRequest);

app.use(express.static('static'));

module.exports = app;