function errHandler(err, req, res, next){
    let statusCode;
    let message;
    
    switch (err.name){
        case "LoginError":
            statusCode = 400;
            message = "Email or Password is incorrect"
            break;
        case "SequelizeValidationError":
            statusCode = 400;
            message = err.errors[0].message
            break;
        case "NotFound":
            statusCode = 404;
            message = err.message
        case "AuthorizationError":
            statusCode = 401;
            message = err.message
        default:
            if (err.message == undefined) {
                message = err
            } else {
                message = err.message;
            }
            
            statusCode = 500;
            break;
    }

    console.log("DARI ERROR HANDLE : " , err)

    res.status(statusCode).json({
        message: message
    })
}

module.exports = errHandler;