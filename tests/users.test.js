const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../database/config');
const User = require('../database/users');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('User API', () => {
  test('POST /users - create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ email: 'test@example.com', password: 'password123', role: 'user' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  test('POST /users - missing email returns 400', async () => {
    const res = await request(app)
      .post('/users')
      .send({ password: 'password123' });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error.message).toBe('Email and password are required');
  });

  test('GET /users - returns all users', async () => {
    const res = await request(app).get('/users');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});