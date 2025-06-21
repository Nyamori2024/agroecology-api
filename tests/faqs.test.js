const request = require('supertest');
const app = require('../app');

describe('GET /faqs', () => {
  it('should return FAQs in default language (English)', async () => {
    const res = await request(app).get('/faqs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('question');
    expect(res.body[0]).toHaveProperty('answer');
  });

  it('should return FAQs in French if language header is set', async () => {
    const res = await request(app).get('/faqs').set('Accept-Language', 'fr');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
