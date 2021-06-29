const {user} = require("../models")
const { generateToken } = require('../helpers/jwt.js')
const { comparePassword } = require('../helpers/bcrypt')

class UsersController{
    static register(req, res, next) {
        user.create({
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
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
            console.log(err)
            next(err)
        })
    }

    static login(req, res, next){
        console.log(req.body)
        user.findOne({
            where: {email: req.body.email}
        })
        .then(result => {
            if (!result) {
                throw{
                    name: "LoginError",
                    message: `User Or Password Incorrect"`
                }
            }

            const checkPW = comparePassword(req.body.password, result.password)

            if (!checkPW){
                throw {
                    name: "LoginError",
                    message: "User Or Password Incorrect"
                }
            }

            //kirim token
            const token = generateToken({
                id: result.id,
                email: result.email,
            });

            res.status(200).json({
                access_token: token,
            })
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }
}

module.exports = UsersController