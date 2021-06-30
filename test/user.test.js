const request = require('supertest')
const app = require('../index.js')
const { sequelize } = require('../models/index.js')
const {queryInterface} = sequelize;
let token = "";

beforeAll((done) =>{
    queryInterface.bulkDelete("users", null, {})
    .then(() => {
        done();
    })
})

afterAll((done) =>{
    queryInterface.bulkDelete("users", null, {})
    .then(() => {
        done();
    })
})

describe("POST /users/register", () => {
    it("Should create user and response in JSON with access_token", function(done) {
        request(app)
        .post("/users/register") 
        .set("Content-Type", "application/json")     
        .send({email: "budigk@gmail.com", password: "123456", role: "admin"})
        .then(response => {
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("access_token", expect.any(String))

            done()   
        });
    })

    it("Should not create user and give response error", function(done) {
        request(app)
        .post("/users/register") 
        .set("Content-Type", "application/json")     
        .send({email: "", password: "", role: "admin"})
        .then(response => {
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message", expect.any(String))
            done() 
        });
    })
})

describe("POST /users/login", () => {
    it("Should login success with response in JSON WIH access_token", function(done) {
        request(app)
        .post("/users/login") 
        .set("Content-Type", "application/json")     
        .send({email: "budigk@gmail.com", password: "123456"})
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("access_token", expect.any(String))
            token = response.body.access_token
            done()   
        });
    })

    it("Should login error and give response error", function(done) {
        request(app)
        .post("/users/login") 
        .set("Content-Type", "application/json")     
        .send({email: "", password: ""})
        .then(response => {
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message", expect.any(String))
            done() 
        });
    })
})
