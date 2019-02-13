const request = require('supertest');
const app = require('../app');

describe('Router API', function() {

  it('path param router', function(done) {
    request(app)
      .get('/api/v1/storeId/1234')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('query param router', function(done) {
    request(app)
      .get('/api/v1/campaigns')
      .query({ storeId: '1234' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('http header router', function(done) {
    request(app)
      .get('/api/v1/settings')
      .set('storeid', '1234')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
