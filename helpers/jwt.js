const jwt = require("jsonwebtoken")

const SECRET_KEY = 'rahasia'
const jwtEncrypt = (payload) => jwt.sign(payload, SECRET_KEY)

const jwtDecrypt = (token) => jwt.verify(token, SECRET_KEY)

module.exports = {jwtDecrypt, jwtEncrypt}