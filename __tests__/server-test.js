const request = require('supertest');
const app = require('../server/app');

describe('Test the root', () => {
  test('It should respond to the GET method', (done) => {
    request(app).get('/').then((res) => {
      expect(res.statusCode).toBe(200);
      done();
    });
  });

  test('It should respond with listing info when a GET to listing endpoint is requested', (done) => {
    request(app).get('/api/listings/1001').then((res) => {
      expect(res.body.id).toBeDefined();
      expect(res.body.base_rate_per_night).toBeDefined();
      expect(res.body.max_guests).toBeDefined();
      expect(res.body.cleaning_fee).toBeDefined();
      done();
    });
  });

  test('It should respond with calendar info when a GET to calendar endpoint is requested', (done) => {
    request(app).get('/api/listings/1001/calendar/201805').then((res) => {
      expect(res.body.days).toBeDefined();
      expect(res.body.monthName).toBeDefined();
      expect(res.body.numberOfDaysInMonth).toBeDefined();
      expect(res.body.firstDayOfMonth).toBeDefined();
      expect(res.body.year).toBeDefined();
      expect(res.body.listingId).toBeDefined();
      done();
    });
  });
});
