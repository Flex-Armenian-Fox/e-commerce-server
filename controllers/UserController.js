const {user} = require("../models")
const { generateToken } = require('../helpers/jwt.js')
const { comparePassword } = require('../helpers/bcrypt')

class UsersController{
    static register(req, res, next) {
        let dataUser = {
            email: req.body.email,
            password: req.body.password
        }

        if (!req.body.role) {
            dataUser.role = "cust"
        } else {
            dataUser.role = req.body.role
        }

        user.create(dataUser)
        .then(result => {
            const token = generateToken({
                id: result.id,
                email: result.email,
            });

            res.status(201).json({
                role: result.role,
                access_token: token
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static login(req, res, next){
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
                role: result.role,
                access_token: token,
            })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UsersController