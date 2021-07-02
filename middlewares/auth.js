const request = require("superagent")
const {jwtDecrypt} = require("../helpers/jwt")
const {User} = require('../models/')

const authentication = (req, res, next) =>{
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

const adminAuth = (req, res, next) =>{
    if (req.currentUser.role == "admin") {next()}
    else (next({name: "unauthorized"}))
}

module.exports = {authentication, adminAuth}