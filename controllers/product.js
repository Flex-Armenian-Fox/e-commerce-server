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
    static putProduct(req, res, next){
        if(req.currentUser.role != 'admin')  next({name: "unauthorized"})
        Product.update(req.body, {where: {id:req.params.id}, returning: true})
            .then((product) => {
                if(product[0] == 0) throw({name: "notFound", message: "Product not found" })
                res.status(200).json("edit success")
            })
            .catch(err => next(err))
    }
}

module.exports = Controller