const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { hashPassword } = require('../helpers/bcrypt')
const { queryInterface } = sequelize
const { User, Product } = require('../models')
const { encodePayload } = require('../helpers/jwt')
let access_token = null
let access_token_nonadmin = null
const idNotFound = 999
let productId = null

//1. seeding ke table user dengan email dan password si admin
//2. passwordnya harus di bcyrpt sebelum di insert
//3. dapetin akses token dengan jwt helper, payload yang didapat cek ke db dengan findOne, kalau ada set access_token
//4. baru insert product nya

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

            return queryInterface.bulkDelete('Products', null, {})
        })
        .then(() => {
            return queryInterface.bulkInsert('Products', [{
                name: 'Motor Ducati',
                image_url: 'https://imgcdn.oto.com/medium/gallery/exterior/69/954/ducati-monster-51785.jpg',
                price: 2000000,
                stock: 5,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Motor Ninja',
                image_url: 'https://imgcdn.oto.com/medium/gallery/exterior/69/954/ducati-monster-51785.jpg',
                price: 1500000,
                stock: 6,
                createdAt: new Date(),
                updatedAt: new Date()
            }], {})
        })
        .then(() => {
            return Product.findOne({
                where: { name: 'Motor Ducati' }
            })
        })
        .then((product) => {
            productId = product.id
            done()
        })
})

afterAll((done) => {
    queryInterface.bulkDelete('Products', null, {})
        .then(() => {
            return queryInterface.bulkDelete('Users', null, {})
        })
        .then(() => {
            done()
        })
})

describe('Testing GET Products Endpoint (/api/products)', () => {
    it('Should return response status 200 if access_token authenticated', (done) => {
        request(app)
            .get('/api/products')
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
            .get('/api/products')
            .set('Content-Type', 'application/json')
            .then(response => {
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty('message', 'error')
                expect(response.body).toHaveProperty('error', expect.any(Object))
                done()
            })
    })
})

describe('Testing GET Products By Id (/api/products/:id)', () => {
    it('Should return response status 200 if access_token authenticated', (done) => {
        request(app)
            .get(`/api/products/${productId}`)
            .set('Content-Type', 'application/json')
            .set('access_token', access_token)
            .then(response => {
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty('message', 'success')
                expect(response.body).toHaveProperty('data', expect.any(Object))
                done()
            })
    })

    it('Should return response status 401 no access_token headers provided', (done) => {
        request(app)
            .get(`/api/products/${productId}`)
            .set('Content-Type', 'application/json')
            .then(response => {
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty('message', 'error')
                expect(response.body).toHaveProperty('error', expect.any(Object))
                done()
            })
    })

    it('Should return response status 404 if product_id was not found in database', (done) => {
        request(app)
            .get(`/api/products/${idNotFound}`)
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

describe('Testing POST Products Endpoint (/api/products)', () => {
    it('Should return response status 201 if access_token provided with complete request body', (done) => {
        request(app)
            .post('/api/products')
            .set('Content-Type', 'application/json')
            .set('access_token', access_token)
            .send({
                name: "Motor Ducati",
                image_url: "https://imgcdn.oto.com/medium/gallery/exterior/69/954/ducati-monster-51785.jpg",
                price: 2000000,
                stock: 5,
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
            .post('/api/products')
            .set('Content-Type', 'application/json')
            .set('access_token', access_token)
            .send({
                name: "",
                image_url: "https://imgcdn.oto.com/medium/gallery/exterior/69/954/ducati-monster-51785.jpg",
                price: 2000000,
                stock: 5,
            })
            .then(response => {
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty('message', 'error')
                expect(response.body).toHaveProperty('error', expect.any(Object))
                done()
            })
    })

    it('Should return response status 400 if stock and price less than 0', (done) => {
        request(app)
            .post('/api/products')
            .set('Content-Type', 'application/json')
            .set('access_token', access_token)
            .send({
                name: "Ducati",
                image_url: "https://imgcdn.oto.com/medium/gallery/exterior/69/954/ducati-monster-51785.jpg",
                price: -1,
                stock: -2,
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
            .post('/api/products')
            .set('Content-Type', 'application/json')
            .set('access_token', access_token_nonadmin)
            .send({
                name: "Ducati",
                image_url: "https://imgcdn.oto.com/medium/gallery/exterior/69/954/ducati-monster-51785.jpg",
                price: 1000000,
                stock: 10,
            })
            .then(response => {
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty('message', 'error')
                expect(response.body).toHaveProperty('error', expect.any(Object))
                done()
            })
    })
})

describe('Testing PUT Products Endpoint (/api/products/:id)', () => {
    it('Should return response status 200 if access_token provided with complete request body', (done) => {
        request(app)
            .put(`/api/products/${productId}`)
            .set('Content-Type', 'application/json')
            .set('access_token', access_token)
            .send({
                name: "Motor Yamaha",
                image_url: "https://imgcdn.oto.com/medium/gallery/exterior/69/954/ducati-monster-51785.jpg",
                price: 15000000,
                stock: 10,
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
            .put(`/api/products/${productId}`)
            .set('Content-Type', 'application/json')
            .set('access_token', access_token)
            .send({
                name: "",
                image_url: "https://imgcdn.oto.com/medium/gallery/exterior/69/954/ducati-monster-51785.jpg",
                price: 2000000,
                stock: 5,
            })
            .then(response => {
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty('message', 'error')
                expect(response.body).toHaveProperty('error', expect.any(Object))
                done()
            })
    })

    it('Should return response status 400 if stock and price less than 0', (done) => {
        request(app)
            .put(`/api/products/${productId}`)
            .set('Content-Type', 'application/json')
            .set('access_token', access_token)
            .send({
                name: "Ducati",
                image_url: "https://imgcdn.oto.com/medium/gallery/exterior/69/954/ducati-monster-51785.jpg",
                price: -1,
                stock: -2,
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
            .put(`/api/products/${productId}`)
            .set('Content-Type', 'application/json')
            .set('access_token', access_token_nonadmin)
            .send({
                name: "Ducati",
                image_url: "https://imgcdn.oto.com/medium/gallery/exterior/69/954/ducati-monster-51785.jpg",
                price: 1000000,
                stock: 10,
            })
            .then(response => {
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty('message', 'error')
                expect(response.body).toHaveProperty('error', expect.any(Object))
                done()
            })
    })

    it('Should return response status 404 if id product passed from param not found in database', (done) => {
        request(app)
            .put(`/api/products/${idNotFound}`)
            .set('Content-Type', 'application/json')
            .set('access_token', access_token)
            .send({
                name: "Ducati",
                image_url: "https://imgcdn.oto.com/medium/gallery/exterior/69/954/ducati-monster-51785.jpg",
                price: 1000000,
                stock: 10,
            })
            .then(response => {
                expect(response.status).toBe(404)
                expect(response.body).toHaveProperty('message', 'error')
                expect(response.body).toHaveProperty('error', expect.any(Object))
                done()
            })
    })
})

describe('Testing DELETE Products Endpoint (/api/products/:id)', () => {
    it('Should return response status 200 if id product from param found in database and access token to admin role', (done) => {
        request(app)
            .delete(`/api/products/${productId}`)
            .set('Content-Type', 'application/json')
            .set('access_token', access_token)
            .then(response => {
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty('message', 'delete success')
                expect(response.body).toHaveProperty('data', null)
                done()
            })
    })

    it('Should return response status 401 if access token not from admin role', (done) => {
        request(app)
            .delete(`/api/products/${productId}`)
            .set('Content-Type', 'application/json')
            .set('access_token', access_token_nonadmin)
            .then(response => {
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty('message', 'error')
                expect(response.body).toHaveProperty('error.name', 'Unauthorized')
                done()
            })
    })
    
    it('Should return response status 404 if id product not found in database', (done) => {
        request(app)
            .delete(`/api/products/${idNotFound}`)
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