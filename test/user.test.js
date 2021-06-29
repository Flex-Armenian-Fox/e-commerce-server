const request = require('supertest')
const app = require('../index.js')

describe("POST /users/register", () => {
    it("Should create user and response in JSON with access_token", function(done) {
        request(app)
        .post("/users/register") 
        .set("Content-Type", "application/json")     
        .send({email: "budigk@gmail.com", password: "123456"})
        .then(response => {
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("access_token", expect.any(String))
        });
        done()   
    })
})