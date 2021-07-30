'use strict'

const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(8)

function hashPassword(input_password) {
    const hashedPw = bcrypt.hashSync(input_password, salt)
    return hashedPw
}

function comparePassword(input_password, db_password) {
    const validPw = bcrypt.compareSync(input_password, db_password)
    return validPw
}

module.exports = {
    hashPassword,
    comparePassword
}