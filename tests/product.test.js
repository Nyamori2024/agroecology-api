const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

require('dotenv').config({ path: '.env.test' });
jest.setTimeout(15000); // Give extra time for DB connection

// Connect to test DB before tests
beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  await mongoose.connect(process.env.MONGO_URI_TEST);
});

// Clean up all collections after tests
afterAll(async () => {
  if (mongoose.connection.readyState) {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany(); // Removes data but keeps structure
    }
    await mongoose.connection.close();
  }
});

// Test GET /products
describe('GET /products', () => {
  it('should return a list of products', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
