const request = require('supertest');
const app = require('../app');
const bcrypt = require('bcrypt');
const db = require("../models");
const Users = db.users;

describe('Auth Controller', () => {
    test('POST /register - It should register a new user', async () => {
        await Users.destroy({where: {username: 'newUser'}})
        const userData = {
            username: 'newUser',
            password: 'password123',
        };

        const response = await request(app)
            .post('/register')
            .send(userData);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    test('POST /register - It should handle registration of an existing user', async () => {
        const hash = bcrypt.hashSync("password123", bcrypt.genSaltSync(10));
        await Users.findOrCreate({where: {username: "existingUser"}, defaults: { username: "existingUser", password: hash }})
        
        const existingUser = {
            username: 'existingUser',
            password: hash,
        };

        const response = await request(app)
            .post('/register')
            .send(existingUser);

        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty('message');
    });

    test('POST /login - It should log in a user', async () => {
        const userData = {
            username: 'existingUser',
            password: 'password123',
        };

        const response = await request(app)
            .post('/login')
            .send(userData);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    test('POST /login - It should handle invalid credentials', async () => {
        const invalidCredentials = {
            username: 'existingUser',
            password: 'wrongpassword',
        };

        const response = await request(app)
            .post('/login')
            .send(invalidCredentials);

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('message');
    });

    test('POST /login - It should handle non-existent user', async () => {
        const nonExistentUser = {
            username: 'nonExistentUser',
            password: 'password123',
        };

        const response = await request(app)
            .post('/login')
            .send(nonExistentUser);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message');
    });
});
