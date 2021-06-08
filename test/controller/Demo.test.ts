const request = require('supertest');

describe('Demo controller', () => {
  test('GET /user/1234', done => {
    request('http://localhost:3000/user')
      .get('/1234')
      .set('Accept', 'application/json')
      .send()
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.success).toEqual(true);
        expect(response.body.data.userId).toBe('1234');
        done();
      })
      .catch(err => done(err));
  });
});
