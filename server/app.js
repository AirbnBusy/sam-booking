const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database');

const app = express();

app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());

app.get('/listings/:listingId', (req, res) => {
  res.redirect('/');
});

app.get('/api/listings/:listingId', (req, res) => {
  db.getAllUnavailableDates(req.params.listingId)
    .then((rows) => {
      console.log(rows);
    })
    .catch((err) => {
      res.statusCode(500).send(err);
    });
});

app.get('/api/listings/:listingId/calendar/:yearMonth', (req, res) => {
  res.send(req.params);
});

module.exports = app;
