const { verifyToken } = require('../helpers/jwt');
const {user} = require('../models')
const {product} = require('../models')

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

module.exports= {
    authentication, authorizationRole
}