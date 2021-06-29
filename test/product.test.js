const request = require('supertest')
const app = require('../app')
const { jwtEncrypt } = require('../helpers/jwt')
const {sequelize, User} = require('../models')
const {queryInterface} = sequelize
const bcrypt = require('bcryptjs')

let access_token = ""

beforeAll((done) =>{
    queryInterface.bulkDelete("Users")
    .then(() =>{
        let data = [{
          email: "admin@mail.com",
          password: bcrypt.hashSync('1234'),
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        }]
        queryInterface.bulkInsert("Users", data)
    })
    .then(() => {
        User.findOne({where: {email: "admin@mail.com"}})
        .then(user =>{
            access_token = jwtEncrypt({id: user.id})
            console.log(access_token)
            done()
        })
    })
})

describe("Create Product", (done) =>{
    it("Should create a new product",(done) =>{
        request(app)
            .post('/products')
            .set('content-type', 'application/json')
            .set('access_token', access_token)
            .send({
                name: 'test-product',
                image_url: 'test-url',
                price: 100,
                stock: 100
            })
            .then((res) => {
                expect(res.status).toBe(201)
            })
            .then(() => done())
    })
})