const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const api = supertest(app);

describe('when initially there are some equipment', () => {
    test('some equipment are returned', async () => {
        await api.get('/api/equipemnt')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
