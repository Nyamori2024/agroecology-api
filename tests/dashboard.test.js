const request = require('supertest');
const app = require('../app');

describe('GET /dashboard', () => {
  it('should return dashboard metrics', async () => {
    const res = await request(app).get('/dashboard');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('totalUsers');
    expect(res.body).toHaveProperty('totalProducts');
    expect(res.body).toHaveProperty('contributors');
  });
});
