'use strict'

const {User} = require('../models')
const jwt = require('jsonwebtoken')
const {comparePassword} = require('../helpers/bcrypt.js')

class ControllerUser {

    static register (req, res, next) {
        console.log('MASUK STATIC REGISTER')
        User.create({
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        })
        .then(user => {
            const token = jwt.sign({id: user.id, email: user.email}, 'ubigoreng')
            res.status(201).json({
                message: `User ${user.email} has been registered!`,
                accesstoken: token
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static login (req, res, next) {
        User.findOne({where: {email: req.body.email}})
            .then(user => {
                if (!user) {
                    throw {
                        name: 'Not Found',
                        message: 'Email/Password incorrect'
                    }
                } else {

                    const isPwValid = comparePassword(req.body.password, user.password)

                    if (!isPwValid) {
                        throw {
                            name: 'Not Authorised',
                            message: 'Email/Password incorrect'
                        }
                    } else {
                        const payload = {id: user.id, email: user.email}
                        const token = jwt.sign(payload, 'ubigoreng')
                        res.status(200).json({
                            accesstoken: token
                        })
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = ControllerUser