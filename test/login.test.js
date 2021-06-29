
const request = require("supertest");
const app = require("../app.js");
const {sequelize} = require("../models")
const {queryInterface} = sequelize
const bcrypt = require('bcryptjs')

beforeAll((done) => {
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
    .then(() => {done()})
})

afterAll((done) => {
    queryInterface.bulkDelete("Users")
    .then(() => {done()})
})

describe("POST /login", () =>{
    it("Should return JSON with access_token", (done) =>{
        request(app)
            .post('/login')
            .set('content-type', 'application/json')
            .send({email: 'admin@mail.com', password:'1234'})
            .then((res) =>{
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty(
                    "access_token", expect.any(String)
                )
                done()
            })
    })
    
    it("Should return Error 404", (done) =>{
        request(app)
            .post('/login')
            .set('content-type', 'application/json')
            .send({email: 'admin1@mail.com', password:'1234'})
            .then((res) =>{
                expect(res.status).toBe(404)
                done()
            })
    })

    it("Should return Error 401", (done) =>{
        request(app)
            .post('/login')
            .set('content-type', 'application/json')
            .send({email: 'admin@mail.com', password:'12345'})
            .then((res) =>{
                expect(res.status).toBe(401)
                done()
            })
    })

    it("Should return Error 400", (done) =>{
        request(app)
            .post('/login')
            .set('content-type', 'application/json')
            .send({email: 'admin@mail.com', password:'12345'})
            .then((res) =>{
                expect(res.status).toBe(401)
                done()
            })
    })
})