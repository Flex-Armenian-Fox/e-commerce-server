const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { hashPassword } = require('../helpers/bcrypt')
const { queryInterface } = sequelize
const { User, Category } = require('../models')
const { encodePayload } = require('../helpers/jwt')
let access_token = null
let access_token_nonadmin = null
const idNotFound = 999
let categoryId = null

beforeAll((done) => {
    queryInterface.bulkDelete('Users', null, {})
        .then(() => {
            return queryInterface.bulkInsert('Users', [{
                email: 'admin@mail.com',
                password: hashPassword('1234'),
                role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                email: 'customer@mail.com',
                password: hashPassword('1234'),
                role: 'customer',
                createdAt: new Date(),
                updatedAt: new Date()
            }], {})
        })
        .then(() => {
            return User.findOne({
                where: { email: 'admin@mail.com' }
            })
        })
        .then((user) => {
            const payload = {
                id: user.id,
                email: user.email,
                role: user.role
            }
            access_token = encodePayload(payload)

            return User.findOne({
                where: { email: 'customer@mail.com' }
            })
        })
        .then((customer) => {
            const customerPayload = {
                id: customer.id,
                email: customer.email,
                role: customer.role
            }
            access_token_nonadmin = encodePayload(customerPayload)

            return queryInterface.bulkDelete('Categories', null, {})
        })
        .then(() => {
            return queryInterface.bulkInsert('Categories', [{
                category_name: "Touring Bike",
                category_description: "This is real man!",
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                category_name: "Sports Bike",
                category_description: "Real Man Ride Sports Bike!",
                createdAt: new Date(),
                updatedAt: new Date()
            }], {})
        })
        .then(() => {
            return Category.findOne({
                where: { category_name: 'Touring Bike' }
            })
        })
        .then((category) => {
            categoryId = category.id
            done()
        })
})

afterAll((done) => {
    queryInterface.bulkDelete('Categories', null, {})
        .then(() => {
            return queryInterface.bulkDelete('Users', null, {})
        })
        .then(() => {
            done()
        })
})

describe('Testing GET Category Endpoint (/api/categories)', () => {
    it('Should return response status 200 if access_token authenticated', (done) => {
        request(app)
            .get('/api/categories')
            .set('Content-Type', 'application/json')
            .set('access_token', access_token)
            .then(response => {
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty('message', 'success')
                expect(response.body).toHaveProperty('data', expect.any(Array))
                done()
            })
    })

    it('Should return response status 401 no access_token headers provided', (done) => {
        request(app)
            .get('/api/categories')
            .set('Content-Type', 'application/json')
            .then(response => {
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty('message', 'error')
                expect(response.body).toHaveProperty('error', expect.any(Object))
                done()
            })
    })
})

describe('Testing GET Category By Id (/api/categories/:id)', () => {
    it('Should return response status 200 if access_token authenticated', (done) => {
        request(app)
            .get(`/api/categories/${categoryId}`)
            .set('Content-Type', 'application/json')
            .set('access_token', access_token)
            .then(response => {
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty('message', 'success')
                expect(response.body).toHaveProperty('data', expect.any(Object))
                done()
            })
    })

    it('Should return response status 401 if no access_token headers provided', (done) => {
        request(app)
            .get(`/api/categories/${categoryId}`)
            .set('Content-Type', 'application/json')
            .then(response => {
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty('message', 'error')
                expect(response.body).toHaveProperty('error', expect.any(Object))
                done()
            })
    })

    it('Should return response status 404 if category_id was not found in database', (done) => {
        request(app)
            .get(`/api/categories/${idNotFound}`)
            .set('Content-Type', 'application/json')
            .set('access_token', access_token)
            .then(response => {
                expect(response.status).toBe(404)
                expect(response.body).toHaveProperty('message', 'error')
                expect(response.body).toHaveProperty('error.name', 'NotFound')
                done()
            })
    })
})

describe('Testing POST Category Endpoint (/api/categories)', () => {
    it('Should return response status 201 if access_token provided with complete request body', (done) => {
        request(app)
            .post('/api/categories')
            .set('Content-Type', 'application/json')
            .set('access_token', access_token)
            .send({
                category_name: 'Naked Bike',
                category_description: 'This is real man!'
            })
            .then(response => {
                expect(response.status).toBe(201)
                expect(response.body).toHaveProperty('message', 'success')
                expect(response.body).toHaveProperty('data', expect.any(Object))
                done()
            })
    })

    it('Should return response status 400 if request body not complete', (done) => {
        request(app)
            .post('/api/categories')
            .set('Content-Type', 'application/json')
            .set('access_token', access_token)
            .send({
                category_name: '',
                category_description: 'This is real man!'
            })
            .then(response => {
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty('message', 'error')
                expect(response.body).toHaveProperty('error', expect.any(Object))
                done()
            })
    })

    it('Should return response status 401 if access token provided was not from admin role', (done) => {
        request(app)
            .post('/api/categories')
            .set('Content-Type', 'application/json')
            .set('access_token', access_token_nonadmin)
            .send({
                category_name: 'Naked Bike',
                category_description: 'This is real man!'
            })
            .then(response => {
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty('message', 'error')
                expect(response.body).toHaveProperty('error', expect.any(Object))
                done()
            })
    })
})

describe('Testing PUT Category Endpoint (/api/categories/:id)', () => {
    it('Should return response status 200 if access_token provided with complete request body', (done) => {
        request(app)
            .put(`/api/categories/${categoryId}`)
            .set('Content-Type', 'application/json')
            .set('access_token', access_token)
            .send({
                category_name: 'Adventure Bike',
                category_description: 'This is real man!'
            })
            .then(response => {
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty('message', 'update success')
                expect(response.body).toHaveProperty('data', expect.any(Array))
                done()
            })
    })

    it('Should return response status 400 if request body not complete', (done) => {
        request(app)
            .put(`/api/categories/${categoryId}`)
            .set('Content-Type', 'application/json')
            .set('access_token', access_token)
            .send({
                category_name: '',
                category_description: 'This is real man!'
            })
            .then(response => {
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty('message', 'error')
                expect(response.body).toHaveProperty('error', expect.any(Object))
                done()
            })
    })

    it('Should return response status 401 if access token provided was not from admin role', (done) => {
        request(app)
            .put(`/api/categories/${categoryId}`)
            .set('Content-Type', 'application/json')
            .set('access_token', access_token_nonadmin)
            .send({
                category_name: 'Toring Bike',
                category_description: 'This is real man!'
            })
            .then(response => {
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty('message', 'error')
                expect(response.body).toHaveProperty('error', expect.any(Object))
                done()
            })
    })

    it('Should return response status 404 if id category passed from param not found in database', (done) => {
        request(app)
            .put(`/api/categories/${idNotFound}`)
            .set('Content-Type', 'application/json')
            .set('access_token', access_token)
            .send({
                category_name: 'Toring Bike',
                category_description: 'This is real man!'
            })
            .then(response => {
                expect(response.status).toBe(404)
                expect(response.body).toHaveProperty('message', 'error')
                expect(response.body).toHaveProperty('error', expect.any(Object))
                done()
            })
    })
})

describe('Testing DELETE Category Endpoint (/api/categories/:id)', () => {
    it('Should return response status 200 if id category from param found in database and access token to admin role', (done) => {
        request(app)
            .delete(`/api/categories/${categoryId}`)
            .set('Content-Type', 'application/json')
            .set('access_token', access_token)
            .then(response => {
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty('message', 'category deleted successfully')
                expect(response.body).toHaveProperty('data', null)
                done()
            })
    })

    it('Should return response status 401 if access token not from admin role', (done) => {
        request(app)
            .delete(`/api/categories/${categoryId}`)
            .set('Content-Type', 'application/json')
            .set('access_token', access_token_nonadmin)
            .then(response => {
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty('message', 'error')
                expect(response.body).toHaveProperty('error.name', 'Unauthorized')
                done()
            })
    })
    
    it('Should return response status 404 if id category not found in database', (done) => {
        request(app)
            .delete(`/api/categories/${idNotFound}`)
            .set('Content-Type', 'application/json')
            .set('access_token', access_token)
            .then(response => {
                expect(response.status).toBe(404)
                expect(response.body).toHaveProperty('message', 'error')
                expect(response.body).toHaveProperty('error.name', 'NotFound')
                done()
            })
    })
})