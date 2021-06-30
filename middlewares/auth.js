const request = require("superagent")
const {jwtDecrypt} = require("../helpers/jwt")
const {User} = require('../models/')

const Authentication = (req, res, next) =>{
    try{
        const dataDecoded = jwtDecrypt(req.headers.access_token)
        User.findByPk(dataDecoded.id)
            .then(user => {
                if (!user) throw {name: "notFound", message:"User not found"}
                else{
                    req.currentUser = {id: user.id, role:user.role}
                    next()
                } 
            })
            .catch(err => {
                next(err)
            })
    }
    catch(err) {next(err)}
}

module.exports = Authentication