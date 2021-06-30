const request = require('supertest')
const app = require('../app')
const { jwtEncrypt } = require('../helpers/jwt')
const {sequelize, User, Product} = require('../models')
const {queryInterface} = sequelize
const bcrypt = require('bcryptjs')

let admin_token = ""
let user_token = ""
let targetID = 0

beforeAll((done) =>{
    queryInterface.bulkDelete("Users")
    .then(() => {return queryInterface.bulkDelete("Products")})
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
        targetID = product.id
        done()
    })
})

afterAll((done) => {
    queryInterface.bulkDelete("Users")
    .then(() => {return queryInterface.bulkDelete("Products")})
    .then(() => done())
})

describe("Create Product", (done) =>{
    it("Should create a new product",(done) =>{
        request(app)
            .post('/products')
            .set('content-type', 'application/json')
            .set('access_token', admin_token)
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

    it("Should return error 400",(done) =>{
        request(app)
            .post('/products')
            .set('content-type', 'application/json')
            .set('access_token', 'dummy token')
            .send({
                name: 'test-product',
                image_url: 'test-url',
                price: 100,
                stock: 100
            })
            .then((res) => {
                expect(res.status).toBe(400)
            })
            .then(() => done())
    })
    
    it("Should return error 404",(done) =>{
        request(app)
            .post('/products')
            .set('content-type', 'application/json')
            .set('access_token', jwtEncrypt({id:9999}))
            .send({
                name: 'test-product',
                image_url: 'test-url',
                price: 100,
                stock: 100
            })
            .then((res) => {
                expect(res.status).toBe(404)
            })
            .then(() => done())
    })

    it("Should return error 401",(done) =>{
        request(app)
            .post('/products')
            .set('content-type', 'application/json')
            .set('access_token', user_token)
            .send({
                name: 'test-product',
                image_url: 'test-url',
                price: 100,
                stock: 100
            })
            .then((res) => {
                expect(res.status).toBe(401)
            })
            .then(() => done())
    })

    it("Should return error 400",(done) =>{
        request(app)
            .post('/products')
            .set('content-type', 'application/json')
            .set('access_token', admin_token)
            .send({
                name: 'test-product',
                image_url: 'test-url',
                price: -1,
                stock: 100
            })
            .then((res) => {
                expect(res.status).toBe(400)
            })
            .then(() => done())
    })

    it("Should return error 400",(done) =>{
        request(app)
            .post('/products')
            .set('content-type', 'application/json')
            .set('access_token', admin_token)
            .send({
                name: 'test-product',
                image_url: 'test-url',
                price: 100,
                stock: -1
            })
            .then((res) => {
                expect(res.status).toBe(400)
            })
            .then(() => done())
    })

    it("Should return error 400",(done) =>{
        request(app)
            .post('/products')
            .set('content-type', 'application/json')
            .set('access_token', admin_token)
            .send({
                name: '',
                image_url: 'test-url',
                price: 100,
                stock: -1
            })
            .then((res) => {
                expect(res.status).toBe(400)
            })
            .then(() => done())
    })

    it("Should return error 400",(done) =>{
        request(app)
            .post('/products')
            .set('content-type', 'application/json')
            .set('access_token', admin_token)
            .send({
                image_url: 'test-url',
                price: 100,
                stock: 100
            })
            .then((res) => {
                expect(res.status).toBe(400)
            })
            .then(() => done())
    })
})

describe("Update Product", (done) =>{
    it("should update the product", (done) =>{
        request(app)
            .put('/products/' + targetID)
            .set('content-type', 'application/json')
            .set('access_token', admin_token)
            .send({
                name: 'edited-product',
                image_url: 'test-url',
                price: 100,
                stock: 100
            })
            .then((res) => {
                expect(res.status).toBe(200)
                done()
            })
    })

    it("Should return error 401", (done) => {
        request(app)
            .put('/products/' + targetID)
            .set('content-type', 'application/json')
            .set('access_token', user_token)
            .send({
                name: 'edited-product',
                image_url: 'test-url',
                price: 100,
                stock: 100
            })
            .then((res) => {
                expect(res.status).toBe(401)
                done()
            })
    })
    
    it("Should return error validation error: Product name cannot be empty", (done) => {
        request(app)
            .put('/products/' + targetID)
            .set('content-type', 'application/json')
            .set('access_token', admin_token)
            .send({
                name: '',
                image_url: 'test-url',
                price: 100,
                stock: 100
            })
            .then((res) => {
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty("message", "Validation error: Product name cannot be empty")
                done()
            })
    })
    
    it("Should return error validation error: Price cannot be negative", (done) => {
        request(app)
            .put('/products/' + targetID)
            .set('content-type', 'application/json')
            .set('access_token', admin_token)
            .send({
                name: 'edited-name',
                image_url: 'test-url',
                price: -1,
                stock: 100
            })
            .then((res) => {
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty("message", "Validation error: Price cannot be negative")
                done()
            })
    })
    
    it("Should return error validation error: Stock cannot be negative", (done) => {
        request(app)
            .put('/products/' + targetID)
            .set('content-type', 'application/json')
            .set('access_token', admin_token)
            .send({
                name: 'edited-name',
                image_url: 'test-url',
                price: 100,
                stock: -1
            })
            .then((res) => {
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty("message", "Validation error: Stock cannot be negative")
                done()
            })
    })

    it("Should return error Product not found", (done) => {
        request(app)
            .put('/products/' + (targetID + 3))
            .set('content-type', 'application/json')
            .set('access_token', admin_token)
            .send({
                name: 'edited-name',
                image_url: 'test-url',
                price: 100,
                stock: 100
            })
            .then((res) => {
                expect(res.status).toBe(404)
                expect(res.body).toHaveProperty("message", "Product not found")
                done()
            })
    })
})

// describe("Delete product"){
//     it("Should return ")
// }