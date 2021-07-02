const request = require('supertest')
const app = require('../app')
const { jwtEncrypt } = require('../helpers/jwt')
const {sequelize, User, Product, Tag, TagList} = require('../models')
const {queryInterface} = sequelize
const bcrypt = require('bcryptjs')

let admin_token = ""
let user_token = ""
let targetProduct = 0
let targetTag = 0
let adminId = 0

beforeAll((done) =>{
    queryInterface.bulkDelete("Users")
    .then(() => {return queryInterface.bulkDelete("Products")})
    .then(() => queryInterface.bulkDelete("Tags"))
    .then(() => queryInterface.bulkDelete("TagLists"))
    .then(() =>{
        let data = [
            {
                email: "admin@mail.com",
                password: bcrypt.hashSync('1234'),
                role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: "user@mail.com",
                password: bcrypt.hashSync('1234'),
                role: 'user',
                createdAt: new Date(),
                updatedAt: new Date()
            },

        ]
        return queryInterface.bulkInsert("Users", data)
    })
    .then(() => {
        return User.findOne({where: {email: "admin@mail.com"}})
        })
    .then(user =>{
        admin_token = jwtEncrypt({id: user.id})
        return User.findOne({where: {email: "user@mail.com"}})
    })
    .then(user => {
        user_token = jwtEncrypt({id: user.id})
        let data = [{
            name: 'seed-product',
            image_url: 'test-url',
            price: 100,
            stock: 100,
            createdAt: new Date(),
            updatedAt: new Date()
        }]
        return queryInterface.bulkInsert("Products", data)
    })
    .then(() => {
        return Product.findOne({where: {name: 'seed-product'}})
    })
    .then(product => {
        targetProduct = product.id
        let data = [{
            name: "testTag",
            updatedAt: new Date(),
            createdAt: new Date()
        }]
        return queryInterface.bulkInsert ("Tags", data)
    })
    .then(() =>{
        return Tag.findOne({where: {name: "testTag"}})
    })
    .then(tag => {
        targetTag = tag.id
        console.log(targetTag+"THIS IS TARGET TAG")
        done()
    })
})

describe("Post Tag", (done) =>{
    it("should return error 401 unauthorized", done =>{
        request(app)
            .post('/tags/')
            .set('content-type', 'application/json')
            .set('access_token', user_token)
            .send({name: 'dummyTag'})
            .then(res => {
                expect(res.status).toBe(401)
                done()
            })
    })

    it("should return error 400 bad request", done =>{
        request(app)
            .post('/tags/')
            .set('content-type', 'application/json')
            .set('access_token', admin_token)
            .send({name: ''})
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty("message", ["Tag name may not be empty"])
                done()
            })
    })
    
    it("should create a new Tag", (done) =>{
        request(app)
            .post('/tags/')
            .set('content-type', 'application/json')
            .set('access_token', admin_token)
            .send({name: 'dummyTag'})
            .then(res => {
                expect(res.status).toBe(201)
                done()
            })
    })
})

describe("Edit tags", (done) =>{
    it("Should return error 401", done =>{
        request(app)
            .put('/tags/' + targetTag)
            .set('content-type', "application/json")
            .set('access_token', user_token)
            .send({name: 'dummyEdit'})
            .then(res => {
                expect(res.status).toBe(401)
                done()
            })  
    })

    it("should return error 404", done => {
        request(app)
            .put('/tags/' + targetTag+999)
            .set('content-type', 'application/json')
            .set('access_token', admin_token)
            .send({name:'dummyEdit'})
            .then(res => {
                expect(res.status).toBe(404)
                done()
            })
    })

    it("should edit the tag", done => {
        request(app)
            .put('/tags/' + targetTag)
            .set('content-type', 'application/json')
            .set('access_token', admin_token)
            .send({name:'dummyEdit'})
            .then(res => {
                expect(res.status).toBe(200)
                done()
            })
    })
})

describe("Delete tags", (done) => {
    it("Should return error 401", done =>{
        request(app)
            .delete('/tags/' + targetTag)
            .set('content-type', "application/json")
            .set('access_token', user_token)
            .then(res => {
                expect(res.status).toBe(401)
                done()
            })  
    })

    it("should return error 404", done => {
        request(app)
            .delete('/tags/' + targetTag+999)
            .set('content-type', 'application/json')
            .set('access_token', admin_token)
            .then(res => {
                expect(res.status).toBe(404)
                done()
            })
    })

    it("should edit the tag", done => {
        request(app)
            .delete('/tags/' + targetTag)
            .set('content-type', 'application/json')
            .set('access_token', admin_token)
            .then(res => {
                expect(res.status).toBe(200)
                done()
            })
    })
})

describe.only("Add Tag", done => {
    it("Should return 401 unauthorized", done =>{
        request(app)
            .post('/productTag/')
            .set('content-type', 'application/json')
            .set('access_token', user_token)
            .then(res => {
                expect(res.status).toBe(401)
                done()
            })
    })

    it("Should return 404 product or tag is not found", done =>{
        request(app)
            .post('/productTag/')
            .set('content-type', 'application/json')
            .set('access_token', admin_token)
            .send({productId: targetProduct+99, tagId: targetTag})
            .then(res => {
                expect(res.status).toBe(404)
                done()
            })
    })

    it("Should return 400 ", done =>{
        request(app)
            .post('/productTag/')
            .set('content-type', 'application/json')
            .set('access_token', admin_token)
            .send({productId: targetProduct+99, tagId: targetTag})
            .then(res => {
                expect(res.status).toBe(404)
                done()
            })
    })

    it.only("should return 201", done =>{
        request(app)
            .post('/productTag/')
            .set('content-type', 'application/json')
            .set('access_token', admin_token)
            .send({productId: targetProduct, tagId: targetTag})
            .then(res => {
                expect(res.status).toBe(201)
                done()
            })    
    })
})