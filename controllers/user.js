const {User} = require('../models/index')
const {compare} = require('../helpers/bcrypt')
const {jwtDecrypt, jwtEncrypt} = require('../helpers/jwt')

class Controller{
    login(req, res, next){
        User.findOne({where: {email: req.body.email}})
            .then(user => {
                if(!user) {throw "User not found"}
                if(compare(req.body.password, user.password)) {
                    const token = jwtEncrypt({id: user.id, role: user.role})
                    res.status(200).json({message: "login successful", access_token: token}) 
                }
            })
    }
}

module.exports = Controller