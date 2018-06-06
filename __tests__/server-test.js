const request = require('supertest');
const app = require('../server/app');

describe('Test the root', () => {
  test('It should respond to the GET method', (done) => {
    request(app).get('/').then((res) => {
      expect(res.statusCode).toBe(200);
      done();
    });
  });
});
