const {User} = require('../models/index')
const {compare} = require('../helpers/bcrypt')
const {jwtDecrypt, jwtEncrypt} = require('../helpers/jwt')

class Controller{
    static login(req, res, next){
        if (!req.body.email || !req.body.password) throw ({name:badRequest})
        User.findOne({where: {email: req.body.email}})
            .then(user => {
                if(!user) {throw {name: "notFound"}}
                if(compare(req.body.password, user.password)) {
                    const token = jwtEncrypt({id: user.id})
                    console.log(token)
                    res.status(200).json({message: "Login successful", access_token: token}) 
                } else {throw {name: "unauthorized", message:"Wrong password"}}
            })
            .catch(error => {
                next(error)
            })
    }
}

module.exports = Controller