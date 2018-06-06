const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());

app.get('/listings/:listingId', (req, res) => {
  res.redirect('/');
});

app.get('/api/listings/:listingId', (req, res) => {
  res.send(req.params);
});

app.get('/api/listings/:listingId/calendar/:yearMonth', (req, res) => {
  res.send(req.params);
});

module.exports = app;
