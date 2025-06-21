const request = require('supertest');
const app = require('../app');
const path = require('path');

describe('POST /ingest/products', () => {
  it('should ingest a valid JSON file', async () => {
    const res = await request(app)
      .post('/ingest/products')
      .attach('file', path.resolve(__dirname, '../data/products.json'));

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/ingested/i);
  });

  it('should return error for invalid type', async () => {
    const res = await request(app)
      .post('/ingest/invalid')
      .attach('file', path.resolve(__dirname, '../data/products.json'));

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid type/i);
  });
});
