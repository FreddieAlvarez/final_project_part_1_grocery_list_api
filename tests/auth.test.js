const request = require('supertest');
const app = require('../app');  
const setupDatabase = require('../setup');

let token;

beforeAll(async () => {
  await setupDatabase(); 
});

beforeEach(async () => {
  const { User } = require('../database/users');
  await User.destroy({ where: {} });
});

describe("AUTH ENDPOINT TESTS", () => {

  // Register new user
  describe("POST /auth/register", () => {
    it("should register a new user", async () => {
      const email = `testuser_${Date.now()}@example.com`;
      const res = await request(app)
        .post("/auth/register")
        .send({
          email: email,
          password: "password123",
          role: "user"
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body.email).toBe(email);
    });

    it("should NOT register a duplicate email", async () => {
      const res = await request(app)
        .post("/auth/register")
        .send({
          email: "testuser@example.com",
          password: "password123",
          role: "user"
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
  });

  // Login tests
  describe("POST /auth/login", () => {
    it("should login and return a JWT token", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({
          email: "testuser@example.com",
          password: "password123"
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token");

      token = res.body.token;
    });

    it("should FAIL login with wrong password", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({
          email: "testuser@example.com",
          password: "wrongpassword"
        });

      expect(res.statusCode).toBe(401);
    });
  });

  // pretected route tests (Authorization)
  describe("Protected route access", () => {

    it("should DENY access without a token", async () => {
      const res = await request(app).get("/lists");
      expect(res.statusCode).toBe(401);
    });

    it("should ALLOW access with a valid token", async () => {
      const res = await request(app)
        .get("/lists")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
    });

  });

});

afterAll(async () => {
  const { sequelize } = require('../database/config');
  await sequelize.close();
});