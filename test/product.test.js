
const request = require('supertest')
const app = require('../app.js')

const {sequelize} = require('../models')
const {queryInterface} = sequelize
const {hashPassword} = require('../helpers/bcrypt.js')
const jwt = require('jsonwebtoken')

let accesstoken = ''

beforeAll((done) => {
    console.log('LIFECYCLE PRODUCTS ==> beforeAll')

    let id = 1
    let email = 'admin1@email.com'

    queryInterface.bulkDelete('Users', null, {})
        .then(() => {
            const dummyUser = {
                id: id,
                email: email,
                password: hashPassword('admin1'),
                role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date()
            }
            return queryInterface.bulkInsert('Users', [dummyUser])
        })
        .then((data) => {
            console.log('QUERY INTERFACE -> PRODUCTS', data)
            const dummyToken = jwt.sign({email, id}, 'ubigoreng')
            accesstoken = dummyToken

            return queryInterface.bulkInsert('Products', [
                {
                    id: 1,
                    name: 'Jeruk',
                    image_url: 'http://www.image.com/1',
                    price: 1000,
                    stock: 20,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 2,
                    name: 'Nanas',
                    image_url: 'http://www.image.com/2',
                    price: 5000,
                    stock: 26,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 3,
                    name: 'Manggis',
                    image_url: 'http://www.image.com/3',
                    price: 500,
                    stock: 19,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
            ])
        })
        .then(() => {
            done()
        })
})


afterAll((done) => {
    console.log('LIFECYCLE PRODUCTS ==> afterAll')
    queryInterface.bulkDelete('Products', null, {})
        .then(() => {
            return queryInterface.bulkDelete('Users', null, {})
        })
        .then(() => {
            done()
        })
})

beforeEach((done) => {
    console.log('LIFECYCLE PRODUCTS ==> beforeEach')
})
afterEach((done) => {
    console.log('LIFECYCLE PRODUCTS ==> afterEach')
})

// PRODUCTS --> DISPLAY ALL
describe('GET /products/', () => {
    // POSITIVE
    it.only('With valid accesstoken, should display all available products', function(done) {
        request(app)
            .get('/products')
            .set('Content-Type', 'application/json')
            .set('accesstoken', accesstoken)
            .then((response) => {
                console.log('INI RESPONSE GET PRODUCTS ** ==> ', response)
                expect(response.status).toBe(200)
                // expect()
            })
    })
})