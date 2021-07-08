const {Tag, TagList, Product} = require('../models/index')

class Controller{
    static postTag(req, res, next){
        Tag.create(req.body)
        .then(() => {
            res.status(201).json({message: "tag created"})
        })
        .catch(err => next(err))
    }

    static putTag(req, res, next){
        Tag.update(req.body, {
            where: {id: req.params.id}, 
            returning: true
        })
            .then((edit) => {
                if(edit[0] == 0) throw {name: "notFound", message: "tag not found"}
                res.status(200).json({message: "tag edited"})
            })
            .catch(err => next(err))
    }

    static delTag(req, res, next){
        Tag.destroy({where: {id: req.params.id}, returning: true})
            .then(re => {
                if(re == 0) throw {name: "notFound", message: "tag not found"}
                res.status(200).json({message: "tag deleted"})
            })
            .catch(err => next(err))
    }

    static getTag(req, res, next){
        Tag.findAll()
            .then(tags => {
                if(tags == 0) throw {name: "notFound", message: "tags not found"}
                console.log(tags)
                res.status(200).json(tags)
            })
            .catch(err => next(err))
    }
    static addTag(req, res, next){
        TagList.create(req.body, {returning: true})
            .then(re => res.status(201).json({message: "tag added"}))
            .catch(err => next(err))
    }

    static removeTag(req, res, next){
        TagList.destroy({where: {id: req.params.id}})
            .then(re => res.status(200).json({message: "delete complete"}))
            .catch(err => next(err))
    }

}

module.exports= Controller