const request = require('supertest')
const app = require('../app')
const { hashPassword } = require('../helpers/bcrypt')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

beforeAll((done) => {
    queryInterface.bulkDelete('Users', null, {})
        .then(() => {
            return queryInterface.bulkInsert('Users', [{
                email: 'admin@mail.com',
                password: hashPassword('1234'),
                role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date()
            }], {})
        })
        .then(() => done())
})

afterAll((done) => {
    queryInterface.bulkDelete('Users', null, {})
        .then(() => done())
})

describe('Testing users login endpoint (/api/users/login)', () => {
    it('Should return response status 200 if user and password correct', (done) => {
        request(app)
            .post('/api/users/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin@mail.com',
                password: '1234'
            })
            .then(response => {
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty('message', 'success')
                expect(response.body).toHaveProperty('data.access_token', expect.any(String))
                done()
            })
    })

    it('Should return response status 401 if user or password incorrect', (done) => {
        request(app)
            .post('/api/users/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin@mail.com',
                password: '123456'
            })
            .then(response => {
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty('message', 'error')
                expect(response.body).toHaveProperty('error', expect.any(Object))
                done()
            })
    })

    it('Should return response status 400 if user or password not provide', (done) => {
        request(app)
            .post('/api/users/login')
            .set('Content-Type', 'application/json')
            .send({
                email: '',
                password: '123456'
            })
            .then(response => {
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty('message', 'error')
                expect(response.body).toHaveProperty('error', expect.any(Object))
                done()
            })
    })
})