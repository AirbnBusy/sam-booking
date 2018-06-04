const mysql = require('promise-mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getAllUnavailableDates = (listingId) => {
  const sql = `
    SELECT 
    * 
    FROM unavailable_dates 
    WHERE listing_id = ${listingId}
    ORDER BY date_booked ASC
  `;

  return connection
    .then(conn => conn.query(sql))
    .catch(err => err);
};

module.exports = {
  getAllUnavailableDates,
};
