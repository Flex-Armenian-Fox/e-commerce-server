const request = require('supertest')
const app = require('../index.js')
const { sequelize } = require('../models/index.js')
const {queryInterface} = sequelize;

beforeAll((done) =>{
    queryInterface.bulkDelete("categories", null, {}).then(() => {
        done();
    })
})

afterAll((done) =>{
    queryInterface.bulkDelete("categories", null, {}).then(() => {
        done();
    })
})

describe("POST /categories", () => {
    it("Should create category in JSON with returning category data", function(done) {
        request(app)
        .post("/categories") 
        .set("Content-Type", "application/json")
        .set({'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYyNDk5MjQzMX0.piciQmnFA4hduk9Tc59hw2t8nUv4m7DKM_BS3eZOOfA'})     
        .send({name: "Fashion"})
        .then(response => {
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("name", expect.any(String))

            done()   
        });
    })

    it("Should not response error cause not have access_token", function(done) {
        request(app)
        .post("/users/register") 
        .set("Content-Type", "application/json")     
        .send({name: "Fashion"})
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