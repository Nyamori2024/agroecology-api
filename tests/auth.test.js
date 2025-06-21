const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('Auth Tests', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  const testUser = {
    username: 'testuser',
    password: 'testpassword'
  };

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/users/register')
      .send(testUser);
    
    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  it('should login the user', async () => {
    const res = await request(app)
      .post('/users/login')
      .send(testUser);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
