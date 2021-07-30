const { verifyToken } = require('../helpers/jwt');
const {user} = require('../models')
const {product} = require('../models')
const {cart} = require('../models')

function authentication(req, res, next){
    try{
        const {access_token} = req.headers;
        const dataDecoded = verifyToken(access_token);
        console.log("AUTH", dataDecoded)
        user.findOne({
            where: {id: dataDecoded.id}
        })
        .then(result =>{
            if(!result) {
                throw{
                    name: "AuthenticationError",
                    message: `user with id: ${dataDecoded.id} not found`,
                }
            }

            req.currentUser = {
                id: result.id,
                email: result.email,
                role: result.role
            }

            next();
        })
        .catch(err => {
            next("authentication : " + err)
        })
    } catch (error) {
        next("authentication : " + error)
    }
}

const authorizationRole = (req, res, next) => {
    const id = req.currentUser.id
    
    if (req.currentUser.role == "admin"){
        return next();
    } else {
        throw{
            name: "AuthorizationError",
            message: "Role of User Must Admin"
        }
    }
}

const authorizationCart = (req, res, next) => {
    const {id} = req.params;
    
    cart.findOne({
        where: {id: id}
    })
    .then(result => {
        if (!result){
            throw {
                name: "AuthorizationError",
                message: `Cart List with id ${id} not found`
            }
        }
        if (result.userid == req.currentUser.id){
            return next();
        } else {
            throw{
                name: "AuthorizationError",
                message: `user with id ${req.currentUser.id} does not have permission`
            }
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports= {
    authentication, authorizationRole, authorizationCart
}