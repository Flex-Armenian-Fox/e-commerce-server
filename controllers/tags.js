const {Tag, TagList} = require('../models/index')

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

    static addTag(req, res, next){
        console.log(req.body)
        TagList.create(req.body, {returning: true})
            .then(re => res.status(201).json(re))
            .catch(err => next(err))
    }

    static removeTag(req, res, next){
        return 0
    }

}

module.exports= Controller