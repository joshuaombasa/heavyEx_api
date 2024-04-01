const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const api = supertest(app);
const Equipment = require('../models/equpment')
const helper = require('./test-helper')

beforeEach(async () => {
    await Equipment.deleteMany({})
    for (let equipment of helper.constructionEquipment) {
        const equipmentObject = new Equipment(equipment)
        await equipmentObject.save()
    }
})

describe('when initially there are some equipment', () => {
    test('equipment are returned as json', async () => {
        await api.get('/api/equipment')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    });

    test('all equipment are returned', async () => {
        let equpmentAtStart = await helper.equipmentInDb()
        const response = await api.get('/api/equipment')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response.body.length).toBe(equpmentAtStart.length)

    });

    test('a particular equipment is within the returned equipment', async () => {
        let equpmentAtStart = await helper.equipmentInDb()
        const response = await api.get('/api/equipment')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const names = response.body.map(e => e.name)
        expect(names).toContain(equpmentAtStart[0].name)

    });
});

describe('fetching a single equipment', () => {
    test('succeeds when given a valid id', async () => {
        let equpmentAtStart = await helper.equipmentInDb()
        const response = await api.get(`/api/equipment/${equpmentAtStart[0].id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('fails with statuscode 404 when given a nonexistentId', async () => {
        const nonExistentId = '6602c339544e74391a37202c'
        const response = await api.get(`/api/equipment/${nonExistentId}`)
            .expect(404)
    })

    test('fails with statuscode 400 when given an invalid id', async () => {
        const response = await api.get(`/api/equipment/huhu6g`)
            .expect(400)
    })
})

describe('addition of a new equipment', () => {
    test('succeeds when given valid data', async () => {
        let equpmentAtStart = await helper.equipmentInDb()
        const response = await api.post('/api/equipment')
            .send(helper.newEquipment)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        let equpmentAtEnd = await helper.equipmentInDb()
        expect(equpmentAtEnd).toHaveLength(equpmentAtStart.length + 1)
    })

    test('fails when given invalid data', async () => {
        let equpmentAtStart = await helper.equipmentInDb()
        const response = await api.post('/api/equipment')
            .send(helper.InvalidEqupment)
            .expect(400)
        let equpmentAtEnd = await helper.equipmentInDb()
        expect(equpmentAtEnd).toHaveLength(equpmentAtStart.length)
    })
})

describe('updating a single equipment', () => {
    test('succeeds when given a valid id and data', async () => {
        let equpmentAtStart = await helper.equipmentInDb()
        await api.put(`/api/equipment/${equpmentAtStart[0].id}`)
            .send(helper.updateData)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        let equpmentAtEnd = await helper.equipmentInDb()
        const names = equpmentAtEnd.map(e => e.name)
        expect(names).toContain(helper.updateData.name)
    })

    test('fails with statuscode 404 when given a nonexistentId', async () => {
        const nonExistentId = '6602c339544e74391a37202c'
        const response = await api.put(`/api/equipment/${nonExistentId}`)
            .send(helper.updateData)
            .expect(404)
    })

    test('fails with statuscode 400 when given an invalid id', async () => {
        const response = await api.put(`/api/equipment/huhu6g`)
            .send(helper.updateData)
            .expect(400)
    })
})

describe('deleting a single equpment', () => {
    test('succeeds when given a valid id', async () => {
        let equpmentAtStart = await helper.equipmentInDb()
        await api.delete(`/api/equipment/${equpmentAtStart[0].id}`)
            .expect(204)
        let equpmentAtEnd = await helper.equipmentInDb()
        expect(equpmentAtEnd).toHaveLength(equpmentAtStart.length - 1)
    })
})

afterAll(async () => {
    await mongoose.connection.close();
});
