'use strict'

const {User} = require('../models')
const jwt = require('jsonwebtoken')

class ControllerUser {

    static register (req, res, next) {
        console.log('MASUK REGISTER')
        User.create({
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        })
        .then(user => {
            console.log('MASUK THEN - REGISTER')
            const token = jwt.sign({id: user.id, email: user.email}, 'ubigoreng')
            res.status(201).json({
                accesstoken: token
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
    }

}

module.exports = ControllerUser