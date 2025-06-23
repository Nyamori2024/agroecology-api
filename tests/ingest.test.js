const mongoose = require('mongoose');
const request = require('supertest');
const path = require('path');
const app = require('../app');

require('dotenv').config({ path: '.env.test' });
jest.setTimeout(15000); // Increase timeout for DB setup

// Connect to test DB before tests run
beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  await mongoose.connect(process.env.MONGO_URI_TEST);
});

// Clean up all collections after tests (no dropDatabase)
afterAll(async () => {
  if (mongoose.connection.readyState) {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany(); // Clears all documents
    }
    await mongoose.connection.close(); // Gracefully close connection
  }
});

// Test ingestion endpoint
describe('POST /ingest/products', () => {
  it('should ingest a valid JSON file', async () => {
    const res = await request(app)
      .post('/ingest/products')
      .attach('file', path.resolve(__dirname, '../data/products.json'));

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toMatch(/added successfully/i);
  });

  it('should return error for invalid type', async () => {
    const res = await request(app)
      .post('/ingest/invalid')
      .attach('file', path.resolve(__dirname, '../data/products.json'));

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid type/i);
  });
});
