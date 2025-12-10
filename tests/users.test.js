const request = require('supertest');
const app = require('../app');
const User = require('../database/users');

const setupDatabase = require('../setup');

beforeAll(async () => {
  await setupDatabase();
});

beforeEach(async () => { 
  await User.destroy({ where: {} }); 
  await User.create({ email: 'default@example.com', password: 'password123', role: 'user' }); 
});

afterAll(async () => {
  const { sequelize } = require('../database/config');
  await sequelize.close();
});

describe('User API', () => {
  test('POST /users - create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ email: 'test@example.com', password: 'password123', role: 'user' });
    expect(res.statusCode).toEqual(201);
    expect(res.body.email).toBe('test@example.com');
  });

  test('POST /users - missing email returns 400', async () => {
    const res = await request(app).post('/users').send({ password: 'password123' });
    expect(res.statusCode).toEqual(400);
  });

  test('GET /users - returns all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});