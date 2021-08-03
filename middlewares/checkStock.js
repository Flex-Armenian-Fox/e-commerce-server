const {Product} = require('../models/index.js')

const checkStock = (req, res, next) => {
    Product.findOne({where: {id: req.params.id}})
        .then(product =>{
            if (!product) throw ({name: "notFound", message:"Product not Found"})
            if (product.stock < req.body.toBuy) throw({name: "badRequest", message:"Item out of stock"})
            next()
        })
        .catch(err => next(err))
}

module.exports = checkStock