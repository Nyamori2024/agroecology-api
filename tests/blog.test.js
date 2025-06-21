const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Generate a test JWT
const testToken = jwt.sign({ id: 'dummyId', email: 'dummy@example.com' }, process.env.JWT_SECRET || 'test');

describe('GET /blogs', () => {
  it('should return a list of blogs', async () => {
    const res = await request(app).get('/blogs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /blogs', () => {
  it('should create a new blog with valid token', async () => {
    const blogData = {
      title: 'Test Blog',
      content: 'This is a test blog content',
      tags: ['test', 'blog']
    };

    const res = await request(app)
      .post('/blogs')
      .set('Authorization', `Bearer ${testToken}`)
      .send(blogData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('Test Blog');
  });

  it('should fail to create blog without token', async () => {
    const res = await request(app).post('/blogs').send({ title: 'No Auth' });
    expect(res.statusCode).toBe(401);
  });
});

// Close DB connection after tests
afterAll(async () => {
  await mongoose.connection.close();
});
