const jwt = require('jsonwebtoken')
const SECRET_KET = process.env.JWT_SECRET

const encodePayload = function(payload) {
    return jwt.sign(payload, SECRET_KET)
}

const decodePayload = function(token) {
    return jwt.verify(token, SECRET_KET)
}

module.exports = { encodePayload, decodePayload }