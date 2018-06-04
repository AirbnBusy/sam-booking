const mysql = require('promise-mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getListingInfo = (listingId) => {
  const sql = `
    SELECT 
    * 
    FROM listings 
    WHERE id = ${listingId}
  `;

  return connection
    .then(conn => conn.query(sql))
    .catch(err => err);
};

const getUnavailableDates = (listingId, yearMonth) => {
  const sql = `
    SELECT 
    EXTRACT(DAY from date_booked) as day
    FROM unavailable_dates 
    WHERE listing_id = ${listingId}
    AND EXTRACT(YEAR_MONTH from date_booked) = ${yearMonth}
    ORDER BY date_booked ASC
  `;

  return connection
    .then(conn => conn.query(sql))
    .catch(err => err);
};

module.exports = {
  getUnavailableDates,
  getListingInfo,
};
