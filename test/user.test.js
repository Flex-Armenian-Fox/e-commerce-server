

const request = require('supertest')
const app = require('../app.js')

describe('POST /users/register', () => {
    it('Should register new user and respond in JSON with accesstoken', function(done) {
        
        request(app)
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send({ email: 'admin1@email.com', password: 'admin1', role: 'admin' })
            .then((response) => {
                expect(response.status).toBe(201)
                expect(response.body).toHaveProperty(
                    'accesstoken',
                    expect.any(String)
                )
                done()
            })
    })
})