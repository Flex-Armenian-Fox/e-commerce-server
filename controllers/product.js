const {Product} = require('../models')

class Controller{
    static postProduct(req, res, next){
        if(req.currentUser.role != 'admin')  next({name: "unauthorized"})
        else{
            Product.create(req.body)
                .then(() => {
                    res.status(201).json("create success")
                })
                .catch(err => next(err))
        }
    }
    static putProduct(req, res, next){
        if(req.currentUser.role != 'admin')  next({name: "unauthorized"})
        else{
            Product.update(req.body, {where: {id:req.params.id}, returning: true})
                .then((product) => {
                    if(product[0] == 0) throw({name: "notFound", message: "Product not found" })
                    res.status(200).json("edit success")
                })
                .catch(err => next(err))
        }
    }
    static delProduct(req, res, next){
        if(req.currentUser.role != 'admin') next({name:"unauthorized"})
        else{
            Product.destroy({where:{id: req.params.id}})
                .then((product) => {
                    if(product == 0) throw({name: "notFound", message: "Product not found"})
                    res.status(200).json({message: "Item deleted"})
                })
                .catch(err => next(err))
        }
    }
}

module.exports = Controller