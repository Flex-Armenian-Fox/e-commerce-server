
const request = require("supertest");
const app = require("../app");
const bcrypt = require("bcryptjs");
const { sequelize } = require("../models");
const { describe } = require("yargs");
const { it, expect } = require("@jest/globals");
const { queryInterface } = sequelize;

describe("POST /login", () =>{
    it("Should return JSON with access_token"), (done) =>{
        request(app)
            .post('/login')
            .set('content-type', 'application/json')
            .send({email: 'admin@mail.com', password:'1234'})
            .then((res) =>{
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty(
                    "access_token", expect.any(String)
                )
            })
            done()
    }
})