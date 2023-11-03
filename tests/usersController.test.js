const request = require('supertest');
const app = require('../app');
const db = require("../models");
const Users = db.users;

describe('Users Controller', () => {
  test('GET /user - It should respond with list of users', async () => {
    const response = await request(app).get('/user');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  test('GET /user/:id - It should respond with a specific user', async () => {
    const user = await Users.findOrCreate({where: {username: "testUser"}, defaults: { username: "testUser", password: "pwd" }})
    const response = await request(app).get(`/user/${user[0].id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username');
    expect(response.body).toHaveProperty('role');
  });

  test('GET /user/:id - It should handle non-existent user', async () => {
    const nonExistentUserId = 999;
    const response = await request(app).get(`/user/${nonExistentUserId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'user doesnt exist');
  });
});
