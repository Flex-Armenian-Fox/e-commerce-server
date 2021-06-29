const {User} = require('../models/index')
const {compare} = require('../helpers/bcrypt')
const {jwtDecrypt, jwtEncrypt} = require('../helpers/jwt')

class Controller{
    static login(req, res, next){
        User.findOne({where: {email: req.body.email}})
            .then(user => {
                console.log(user)
                if(!user) {throw {name: "notFound"}}
                if(compare(req.body.password, user.password)) {
                    const token = jwtEncrypt({id: user.id, role: user.role})
                    console.log(token)
                    res.status(200).json({message: "login successful", access_token: token}) 
                }
            })
            .catch(error => {
                next(error)
            })
    }
}

module.exports = Controller