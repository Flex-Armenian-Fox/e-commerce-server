'use strict'

const {product, category} = require('../models/index.js');

class ProductController{
    static toList(req, res, next){
        product.findAll({
            include: [category],
            order: ['name'],
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static addData(req, res, next){
        product.create(req.body)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            next(err)
        })   
    }

    static updateData(req, res, next){
        product.update(req.body, {
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
        product.findOne({
            where: {id: req.params.id}
        })
        .then(result => {
            if (!result) {
                throw ({
                    name: "NotFound",
                    message: `product with Id ${req.params.id} Not Found`
                })
            } else {
                return product.destroy({
                    where: {
                        id: req.params.id
                    }
                })
            }
        })
        .then(() => {
            res.status(200).json({"message": "product success to delete"})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ProductController;