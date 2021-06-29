const {user} = require("../models")
const { generateToken } = require('../helpers/jwt.js')

class UsersController{
    static register(req, res, next) {
        user.create({
            email: req.body.email,
            password: req.body.password
        })
        .then(result => {
            const token = generateToken({
                id: result.id,
                email: result.email,
            });

            res.status(201).json({
                access_token: token
            })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UsersController