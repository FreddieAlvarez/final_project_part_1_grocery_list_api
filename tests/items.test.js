const request = require('supertest');
const app = require('../app');
const User = require('../database/users');
const List = require('../database/lists');
const Item = require('../database/items');

const setupDatabase = require('../setup');


beforeAll(async () => {
  await setupDatabase();
});

beforeEach(async () => { 
  await Item.destroy({ where: {} }); 
  await List.destroy({ where: {} }); 
  await User.destroy({ where: {} }); 

  const defaultUser = await User.create({ email: 'default@example.com', password: 'password123', role: 'user' }); 
  const defaultList = await List.create({ name: 'Default List', userId: defaultUser.id }); 
  await Item.create({ name: 'Default Item', listId: defaultList.id }); 
});

afterAll(async () => {
  const { sequelize } = require('../database/config');
  await sequelize.close();
});

describe('Item API', () => {
  test('POST /items - create a new item', async () => {
    const list = await List.findOne(); // get default list
    const res = await request(app)
      .post('/items')
      .send({ name: 'New Item', listId: list.id });
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toBe('New Item');
  });

  test('GET /items - returns all items', async () => {
    const res = await request(app).get('/items');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});