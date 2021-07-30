const bcrypt = require('bcryptjs')

const hashPassword = function(input) {
    return bcrypt.hashSync(input, 8)
}

const comparePassword = function(input, password) {
    return bcrypt.compareSync(input, password)
}

module.exports = { hashPassword, comparePassword }