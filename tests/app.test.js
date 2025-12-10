const request = require('supertest');
const app = require('../app'); 
const setupDatabase = require('../setup'); 

beforeAll(async () => {
  await setupDatabase(); 
});

beforeEach(async () => {
  const { User } = require('../database/users');
  await User.destroy({ where: {} });
});

describe('Authentication Endpoints', () => {

  // Registration Tests
  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          email: 'testuser@example.com',
          password: 'password123',
          role: 'user'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.email).toBe('testuser@example.com');
    });

    it('should fail if email already exists', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          email: 'testuser@example.com', // duplicate
          password: 'password123',
          role: 'user'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  // Login Tests 
  describe('POST /auth/login', () => {
    it('should login an existing user and return a token', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'testuser@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');

      token = res.body.token;
    });

    it('should fail login with wrong password', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'testuser@example.com',
          password: 'wrongpassword'
        });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('error');
    });
  });

  //protected rout tests
  describe('Protected routes', () => {
    it('should deny access without token', async () => {
      const res = await request(app).get('/lists');
      expect(res.statusCode).toBe(401);
    });

    it('should allow access with token', async () => {
      const res = await request(app)
        .get('/lists')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    });
  });
});