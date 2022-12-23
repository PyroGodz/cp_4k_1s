const {Publication} = require('../models/models')
const uuid = require("uuid");
const path = require("path");
const ErrorApi = require('../error/errorApi')

class PublicationController {
    async create (req, res, next ){
        try{
            const {price, discount, description, name, categoryId} = req.body;
            const {img} = req.files;
            let nameFile = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', nameFile))
            await Publication.create({price, discount, img: nameFile, description, name, categoryId}).then(task =>{
            res.json(task);
        })
        }
        catch (e){
            next(ErrorApi.badRequest(e.message));
        }
    }
    async getAll(req, res){
        let {categoryId, name, limit, page} = req.query
        let publication
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        if(name) {
            publication = await Publication.findAndCountAll({where: {name}})
        }
        else if(categoryId){
            publication = await Publication.findAndCountAll({where: {categoryId}, limit, offset})
        }
        else{
            publication = await Publication.findAndCountAll({limit, offset})
        }

        res.json(publication);
    }
    async getOne(req, res){
        let param = req.params.id;
        console.log(param);
        await Publication.findOne({where: {id: param}}).then(
            user=>{
                res.json(user);
            }
        )
    }
    async deleteOne(req, res){
        try{
            let param = req.params.id;
            console.log(param);
            await Publication.destroy({where: {id: param}}).then(
                res.json('Deleted!')
            )
        }
        catch (e) {
            res.json('Fail')
        }
    }
}

module.exports = new PublicationController()