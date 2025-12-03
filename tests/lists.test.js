const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../database/config');
const List = require('../database/lists');
const User = require('../database/users');

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await User.create({ email: 'owner@example.com', password: 'password123' });
});

afterAll(async () => {
  await sequelize.close();
});

describe('List API', () => {
  test('POST /lists - create a new list', async () => {
    const res = await request(app)
      .post('/lists')
      .send({ name: 'Groceries', userId: 1 });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  test('POST /lists - missing name returns 400', async () => {
    const res = await request(app)
      .post('/lists')
      .send({ userId: 1 });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error.message).toBe('Name is required');
  });

  test('GET /lists - returns all lists', async () => {
    const res = await request(app).get('/lists');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});