const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://127.0.0.1:27017/testdb');
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('User Registration and Login', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/users/register').send({
      username: 'testuser',
      password: 'password123'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  it('should not register an existing user', async () => {
    await request(app).post('/users/register').send({
      username: 'testuser',
      password: 'password123'
    });

    const res = await request(app).post('/users/register').send({
      username: 'testuser',
      password: 'anotherpass'
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/exists/i);
  });

  it('should login an existing user', async () => {
    const res = await request(app).post('/users/login').send({
      username: 'testuser',
      password: 'password123'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('should reject invalid login', async () => {
    const res = await request(app).post('/users/login').send({
      username: 'testuser',
      password: 'wrongpassword'
    });
    expect(res.statusCode).toBe(401);
  });
});
