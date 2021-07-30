const request = require('supertest')
const app = require('../index.js')
const { sequelize } = require('../models/index.js')
const {queryInterface} = sequelize;
const { generateToken } = require('../helpers/jwt.js')
let token = "";
let idCategory = 0;

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

        done();
    })

})

afterAll((done) =>{
    queryInterface.bulkDelete("users", null, {})
    .then(() => {
        queryInterface.bulkDelete("categories", null, {})
        .then(() => {
            done();
        })
    })
})

describe("POST /categories", () => {
    it("Should create category in JSON with returning category data", function(done) {
        request(app)
        .post("/categories") 
        .set("Content-Type", "application/json")
        .set("access_token", token)     
        .send({name: "Fashion"})
        .then(response => {
            console.log(token)
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("name", expect.any(String))

            done()   
        });
    })

    it("Should  response error cause not have access_token", function(done) {
        request(app)
        .post("/categories") 
        .set("Content-Type", "application/json")     
        .send({name: "Fashion"})
        .then(response => {
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty("message", expect.any(String))
            done() 
        });
    })
})

describe("GET /categories", () => {
    it("Should Return Categories Data in Array", function(done) {
        request(app)
        .get("/categories") 
        .set("Content-Type", "application/json")
        .set("access_token", token)     
        .then(response => {
            expect(response.status).toBe(200);

            idCategory = response.body[0].id
            done()   
        });
    })

    it("Should  response error cause not have access_token", function(done) {
        request(app)
        .post("/categories") 
        .set("Content-Type", "application/json")     
        .send({name: "Fashion"})
        .then(response => {
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty("message", expect.any(String))
            done() 
        });
    })
})

describe("PUT /categories", () => {
    it(`PUT : update category (id:${idCategory}) should return response 200`, function(done) {
        request(app)
        .put(`/categories/${idCategory}`) 
        .set("Content-Type", "application/json")
        .set("access_token", token)     
        .send({name: "Fashion"})
        .then(response => {
            console.log(token)
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("name", expect.any(String))

            done()   
        });
    })

    it(`PUT : Update Category (id:${idCategory}) Should response error cause not have access_token`, function(done) {
        request(app)
        .put(`/categories/${idCategory}`) 
        .set("Content-Type", "application/json")     
        .send({name: "Fashion"})
        .then(response => {
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty("message", expect.any(String))
            done() 
        });
    })
})

describe("DELETE /categories", () => {
    it(`DELETE : delete category (id:${idCategory}) should return response 200`, function(done) {
        request(app)
        .delete(`/categories/${idCategory}`) 
        .set("Content-Type", "application/json")
        .set("access_token", token)     
        .then(response => {
            console.log(token)
            expect(response.status).toBe(200);

            done()   
        });
    })

    it(`DELETE : Delete Category (id:${idCategory}) Should response error cause not have access_token`, function(done) {
        request(app)
        .delete(`/categories/${idCategory}`) 
        .set("Content-Type", "application/json")     
        .then(response => {
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty("message", expect.any(String))
            done() 
        });
    })
})