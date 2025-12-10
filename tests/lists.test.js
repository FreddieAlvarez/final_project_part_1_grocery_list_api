const request = require('supertest');
const app = require('../app');
const User = require('../database/users');
const List = require('../database/lists');

const setupDatabase = require('../setup');

beforeAll(async () => {
  await setupDatabase();
});

beforeEach(async () => { 
  await List.destroy({ where: {} }); 
  await User.destroy({ where: {} }); 

  const defaultUser = await User.create({ email: 'default@example.com', password: 'password123', role: 'user' }); 
  await List.create({ name: 'Default List', userId: defaultUser.id }); 
});

afterAll(async () => {
  const { sequelize } = require('../database/config');
  await sequelize.close();
});

describe('List API', () => {
  test('POST /lists - create a new list', async () => {
    const user = await User.findOne(); // get default user
    const res = await request(app)
      .post('/lists')
      .send({ name: 'My List', userId: user.id });
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toBe('My List');
  });

  test('GET /lists - returns all lists', async () => {
    const res = await request(app).get('/lists');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});