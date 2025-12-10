const request = require('supertest');
const app = require('./app'); // import your Express app

describe('Authentication Endpoints', () => {

  // ======= Registration Tests =======
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

  // ======= Login Tests =======
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

});