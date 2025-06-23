const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

// Load test-specific environment variables from .env.test
require('dotenv').config({ path: '.env.test' });

// Extend Jest timeout for slower connections (e.g., cloud DBs)
jest.setTimeout(15000);

// Connect to the test database before running any tests
beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  try {
    await mongoose.connect(process.env.MONGO_URI_TEST);
    console.log('✅ Connected to test DB');
  } catch (err) {
    console.error('❌ Failed to connect to test DB:', err.message);
  }
});

// Clean up test data and close the connection after all tests finish
afterAll(async () => {
  if (mongoose.connection.readyState) {
    try {
      // Delete all test users instead of dropping the database
      await mongoose.connection.collection('users').deleteMany({});
      await mongoose.connection.close();
      console.log('🧹 Cleaned up test DB and closed connection');
    } catch (err) {
      console.error('❌ Error during cleanup:', err.message);
    }
  }
});

describe('User Registration and Login', () => {
  // Create a unique test user to avoid collisions
  const uniqueUsername = `testuser_${Date.now()}`;
  const user = { username: uniqueUsername, password: 'password123' };

  // Test: New user registration
  it('should register a new user', async () => {
    const res = await request(app).post('/users/register').send(user);
    expect(res.statusCode).toBe(201); // Expect created status
    expect(res.body.token).toBeDefined(); // Expect JWT token in response
  });

  // Test: Duplicate user registration should fail
  it('should not register an existing user', async () => {
    // Register once
    await request(app).post('/users/register').send(user);

    // Attempt to register again with same credentials
    const res = await request(app).post('/users/register').send(user);
    expect(res.statusCode).toBe(400); // Expect bad request
    expect(res.body.message).toMatch(/already exists/i); // Match error message
  });

  // Test: Login with correct credentials
  it('should login successfully', async () => {
    const res = await request(app).post('/users/login').send(user);
    expect(res.statusCode).toBe(200); // Expect success
    expect(res.body.token).toBeDefined(); // Token must be returned
  });

  // Test: Login should fail with incorrect password
  it('should reject invalid login', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({ username: user.username, password: 'wrongpass' });

    expect(res.statusCode).toBe(401); // Expect unauthorized
    expect(res.body.message).toMatch(/invalid/i); // Check error message
  });
});
