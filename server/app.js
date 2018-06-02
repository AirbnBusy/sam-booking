const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use('/listings/:userId', express.static(path.join(__dirname, '../client/dist')))
app.use(bodyParser.json());

app.get('/api/listings/:userId', (req, res) => {
  res.send(req.params);
});

app.get('/api/listings/:userId/calendar/:yearMonth', (req, res) => {
  res.send(req.params);
});

module.exports = app;
