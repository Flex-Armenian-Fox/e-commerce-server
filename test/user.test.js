
const request = require('supertest')
const app = require('../app.js')

const {sequelize} = require('../models')
const {queryInterface} = sequelize
const {hashPassword} = require('../helpers/bcrypt.js')
const jwt = require('jsonwebtoken')

let accesstoken = ''

/* 
// CATATAN:
- bisa .only di 'describe' ataupun di 'it'
    > describe.only (kalau mau per rangkap) / it.only (kalau mau per test)

- EACH: dijalankan per test case (describe > it)
- ALL: dijalankan per suite (blabla.test.js)
    - Penempatan lifecycles ini bebas, karena akan ketrigger oleh JESTnya sesuai function masing2
    - Tapi best practicenya mendingan di atas, supaya jelas
*/

// LIFECYCLE - ALL
beforeAll((done) => {
    console.log('LIFECYCLE USER ==> beforeAll')

    // ini untuk: Bersihin DB
    queryInterface.bulkDelete('Users', null, {})
        .then(() => {
            // setelah DB bersih, buat data dummy USER manual, misalnya gak ada REGISTER
            const dummyUser = {
                email: 'admin1@email.com',
                password: hashPassword('admin1'),
                role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date()
            }
            return queryInterface.bulkInsert('Users', [dummyUser])
        })
        .then(() => {
            // generate JWT
            const dummyToken = jwt.sign({email: 'admin1@email.com'}, 'ubigoreng')
            accesstoken = dummyToken
            done() // supaya LOGIN bisa berjalan tanpa harus ada REGISTER
        })


})

afterAll((done) => {  // ini untuk: Bersihin DB
    console.log('LIFECYCLE USER ==> afterAll')
    queryInterface.bulkDelete('Users', null, {})
        .then(() => {done()})
})

// LIFECYCLE - EACH
beforeEach(() => {})
afterEach(() => {})

// USERS --> REGISTER
// describe('POST /users/register', () => {
//     
//     it('Should register new user and respond in JSON with accesstoken', function(done) {
//         request(app)
//             .post('/users/register')
//             .set('Content-Type', 'application/json')
//             .send({ email: 'admin1@email.com', password: 'admin1', role: 'admin' })
//             .then((response) => {
//                 expect(response.status).toBe(201)
//                 expect(response.body).toHaveProperty('accesstoken', expect.any(String))
//                 done()
//             })
//     })

//     it('Should not create new user and/or give accesstoken', function(done) {
//         request(app)
//             .post('/users/register')
//             .set('Content-Type', 'application/json')
//             .send({ email: '', password: '', role: '' })
//             .then((response) => {
//                 expect(response.status).toBe(400)
//                 expect(response.body).toHaveProperty('error', expect.any(Object))
//                 done()
//             })
//     })
// })

// USERS --> LOGIN
describe.only('POST /users/login', () => {
    
    it('Should allow login and respond in JSON with accesstoken', function(done) {
        request(app)
            .post('/users/login')
            .set('Content-Type', 'application/json')
            // .set('accesstoken', accesstoken) // harusnya di PRODUCTS
            .send({ email: 'admin1@email.com', password: 'admin1' })
            .then((response) => {
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty('accesstoken', expect.any(String))
                done()
            })
    })

    it('Should not allow login and/or give accesstoken', function(done) {
        request(app)
            .post('/users/login')
            .set('Content-Type', 'application/json')
            .send({ email: '', password: '', role: '' })
            .then((response) => {
                expect(response.status).toBe(404)
                expect(response.body).toHaveProperty('error', expect.any(Object))
                done()
            })
    })
})

