const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database');
const dateHelpers = require('./dateHelpers');

const app = express();

app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());

app.get('/api/listings/:listingId/bookings/listingInfo', (req, res) => {
  db.getListingInfo(req.params.listingId)
    .then((rows) => {
      res.send(rows[0]);
    })
    .catch((err) => {
      res.statusCode(500).send(err);
    });
});

app.get('/api/listings/:listingId/bookings/calendar/:yearMonth', (req, res) => {
  const month = req.params.yearMonth.substring(4);
  const year = req.params.yearMonth.substring(0, 4);

  // Get special fields from dateHelpers
  const firstDayOfMonth = dateHelpers.getPositionOfFirstDayOfMonth(year, month);
  const numberOfDaysInMonth = dateHelpers.getNumberOfDaysInMonth(year, month);
  const monthName = dateHelpers.getMonthName(month);

  // SQL Formatting
  const sqlMonthNum = Number(month) + 1;
  const sqlMonth = sqlMonthNum < 10 ? '0' + sqlMonthNum.toString() : sqlMonthNum.toString();
  const sqlYearMonth = year + sqlMonth;

  db.getUnavailableDates(req.params.listingId, sqlYearMonth)
    .then((rows) => {
      const days = rows.map(row => row.day);
      const responseObj = {
        days,
        monthName,
        numberOfDaysInMonth,
        firstDayOfMonth,
        year: Number(year),
        listingId: req.params.listingId,
      };
      res.send(responseObj);
    })
    .catch((err) => {
      res.statusCode(500).send(err);
    });
});

module.exports = app;
