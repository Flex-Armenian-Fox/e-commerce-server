const request = require('supertest')
const app = require('../index.js')
const { sequelize } = require('../models/index.js')
const {queryInterface} = sequelize;
const { generateToken } = require('../helpers/jwt.js')
let token = "";
let idProduct = 0;

beforeAll((done) =>{
    const {hashPassword} = require("../helpers/bcrypt");

    let user = {};
    user.id = 1
    user.email = "admin@mail.com",
    user.password = hashPassword("123456"),
    user.role = "admin"
    user.createdAt = new Date();
    user.updatedAt = new Date();

    queryInterface.bulkInsert('users', [user])
    .then(() => {
        token = generateToken({
            id: user.id,
            email: user.email,
        });

        let category = {
            id: 1,
            name: "Fashion",
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        return queryInterface.bulkInsert('categories', [category])
    })
    .then(() => {
        done()
    })
})

afterAll((done) =>{
    queryInterface.bulkDelete("users", null, {})
    .then(() => {
        return queryInterface.bulkDelete("products", null, {})
    })
    .then(() => {
        return queryInterface.bulkDelete("categories", null, {})
    })
    .then(() => {
        done();
    })
})

describe("POST /products", () => {
    it("POST Products : Should create Product in JSON with returning Product data", function(done) {
        request(app)
        .post("/products") 
        .set("Content-Type", "application/json")
        .set("access_token", token)     
        .send({
            name: "TEST PRODUCT",
            image_url: "http://TEST.JPG",
            price: 10000,
            stock: 10,
            categoryid: 1
        })
        .then(response => {
            console.log(token)
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("name", expect.any(String))

            done()   
        });
    })

    it("POST Products : Should response error cause not have access_token", function(done) {
        request(app)
        .post("/categories") 
        .set("Content-Type", "application/json")     
        .send({
            name: "TEST PRODUCT",
            image_url: "http://TEST.JPG",
            price: 10000,
            stock: 10,
            categoryid: 1
        })
        .then(response => {
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty("message", expect.any(String))
            done() 
        });
    })
})

describe("GET /products", () => {
    it("GET PRODUCT : Should Return Products Data in Array", function(done) {
        request(app)
        .get("/products") 
        .set("Content-Type", "application/json")
        .set("access_token", token)     
        .then(response => {
            expect(response.status).toBe(200);

            idProduct = response.body[0].id
            done()   
        });
    })

    it("GET PRODUCT : Should  response error cause not have access_token", function(done) {
        request(app)
        .post("/products") 
        .set("Content-Type", "application/json")     
        .then(response => {
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty("message", expect.any(String))
            done() 
        });
    })
})

describe("PUT /products", () => {
    it(`PUT : update products (id:${idProduct}) should return response 200`, function(done) {
        request(app)
        .put(`/products/${idProduct}`) 
        .set("Content-Type", "application/json")
        .set("access_token", token)     
        .send({
            name: "TEST PRODUCT",
            image_url: "http://TEST.JPG",
            price: 10000,
            stock: 10,
            categoryid: 1
        })
        .then(response => {
            console.log(token)
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("name", expect.any(String))

            done()   
        });
    })

    it(`PUT : Update Category (id:${idProduct}) Should response error cause not have access_token`, function(done) {
        request(app)
        .put(`/products/${idProduct}`) 
        .set("Content-Type", "application/json")     
        .send({
            name: "TEST PRODUCT",
            image_url: "http://TEST.JPG",
            price: 10000,
            stock: 10,
            categoryid: 1
        })
        .then(response => {
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty("message", expect.any(String))
            done() 
        });
    })
})

describe("DELETE /products", () => {
    it(`DELETE : delete product (id:${idProduct}) should return response 200`, function(done) {
        request(app)
        .delete(`/products/${idProduct}`) 
        .set("Content-Type", "application/json")
        .set("access_token", token)     
        .then(response => {
            console.log(token)
            expect(response.status).toBe(200);

            done()   
        });
    })

    it(`DELETE : Delete product (id:${idProduct}) Should response error cause not have access_token`, function(done) {
        request(app)
        .delete(`/products/${idProduct}`) 
        .set("Content-Type", "application/json")     
        .then(response => {
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty("message", expect.any(String))
            done() 
        });
    })
})