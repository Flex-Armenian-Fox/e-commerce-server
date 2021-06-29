
const request = require("supertest");
const app = require("../app.js");

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
    }),
    it.only("Should return Error 404", (done) =>{
        request(app)
            .post('/login')
            .set('content-type', 'application/json')
            .send({email: 'admin1@mail.com', password:'1234'})
            .then((res) =>{
                expect(res.status).toBe(404)
                done()
            })
    })
})