'use strict'

const {category} = require('../models/index.js');

class CategoryController{
    static toList(req, res, next){
        category.findAll({
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
        console.log("ADDDATA")
        category.create(req.body)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            next(err)
        })   
    }

    static updateData(req, res, next){
        category.update(req.body, {
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
        category.findOne({
            where: {id: req.params.id}
        })
        .then(result => {
            if (!result) {
                throw ({
                    name: "NotFound",
                    message: `category with Id ${req.params.id} Not Found`
                })
            } else {
                return category.destroy({
                    where: {
                        id: req.params.id
                    }
                })
            }
        })
        .then(() => {
            res.status(200).json({"message": "category success to delete"})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = CategoryController;