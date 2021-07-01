'use strict'

const {verifyToken} = require('../helpers/jwt.js')
const {User} = require('../models')

function authentication(req, res, next) {

    try {
        console.log('MASUK AUTHENTICATION')
        const receivedToken = req.headers.accesstoken
        const validToken = verifyToken(receivedToken)

        User.findOne({where: {id: validToken.id}})
            .then(user => {
                if (!user) { // JWT valid, tapi User TIDAK ketemu
                    throw {
                        name: 'Not Found',
                        message: 'Email/password incorrect'
                    }
                } else { // JWT valid DAN User KETEMU
                    req.currentUser = {role: user.role}
                    next()
                }
            })
            .catch(err => {
                next(err)
            })

    } catch (err) {
        next(err)
    }

}

module.exports = authentication