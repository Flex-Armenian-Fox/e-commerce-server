'use strict'

const {cart, product, category} = require('../models/index.js');

class CartController{
    static toList(req, res, next){
        cart.findAll({
            where: {
                userid: req.currentUser.id
            },
            include: [product]
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static addData(req, res, next){
        cart.create(req.body)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            next(err)
        })   
    }

    static updateData(req, res, next){
        cart.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true
        })
        .then(result => {
            if (result[0] === 0){
                res.status(404).json("Data Not Found")
            } else {
                res.status(200).json(result[1][0])
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteData(req, res, next){
        cart.findOne({
            where: {id: req.params.id}
        })
        .then(result => {
            if (!result) {
                throw ({
                    name: "NotFound",
                    message: `cart with Id ${req.params.id} Not Found`
                })
            } else {
                return cart.destroy({
                    where: {
                        id: req.params.id
                    }
                })
            }
        })
        .then(() => {
            res.status(200).json({"message": "cart success to delete"})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = CartController;