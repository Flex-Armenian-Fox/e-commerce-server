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
            console.log('MASUK THEN - REGISTER')
            const token = jwt.sign({id: user.id, email: user.email}, 'ubigoreng')
            res.status(201).json({
                accesstoken: token
            })
        })
        .catch(err => {
            console.log('MASUK CATCH - REGISTER')
            next(err)
        })
    }

    static login (req, res, next) {
        console.log('MASUK STATIC LOGIN')
        User.findOne({where: {email: req.body.email}})
            .then(user => {
                console.log('MASUK THEN - LOGIN')
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
                console.log('MASUK CATCH - LOGIN')
                next(err)
            })
    }

}

module.exports = ControllerUser