const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../database/config');
const Item = require('../database/items');
const List = require('../database/lists');
const User = require('../database/users');

beforeAll(async () => {
  await sequelize.sync({ force: true });
  const user = await User.create({ email: 'user@example.com', password: 'password123' });
  await List.create({ name: 'Groceries', userId: user.id });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Item API', () => {
  test('POST /items - create a new item', async () => {
    const res = await request(app)
      .post('/items')
      .send({ name: 'Milk', purchased: false, listId: 1 });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  test('POST /items - missing name returns 400', async () => {
    const res = await request(app)
      .post('/items')
      .send({ listId: 1 });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error.message).toBe('Name is required');
  });

  test('GET /items - returns all items', async () => {
    const res = await request(app).get('/items');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});