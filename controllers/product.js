const {Product} = require('../models')

class Controller{
    static postProduct(req, res, next){
        if(req.currentUser.role != 'admin')  next({name: "unauthorized"})
        Product.create(req.body)
            .then(() => {
                res.status(201).json("create success")
            })
            .catch(err => next(err))
    }
}

module.exports = Controller