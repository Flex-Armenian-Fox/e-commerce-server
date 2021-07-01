'use strict'

const jwt = require('jsonwebtoken')
const secretKey = 'ubigoreng'

function signToken(payload) {
    const generatedToken = jwt.sign(payload, secretKey)
    return generatedToken
}

function verifyToken(input_token) {
    const decodedToken = jwt.verify(input_token, secretKey)
    return decodedToken
}

module.exports = {
    signToken,
    verifyToken
}