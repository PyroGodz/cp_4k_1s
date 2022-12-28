const {Publication, Discount} = require('../models/models')
const uuid = require("uuid");
const path = require("path");
const ErrorApi = require('../error/errorApi')

class PublicationController {
    async create (req, res, next ){
        try{
            const {price, discountId, description, name, categoryId} = req.body;
            const {img} = req.files;
            let nameFile = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', nameFile))
            console.log(discountId)
            await Publication.create({price, discountId, img: nameFile, description, name, categoryId}).then(task =>{
            res.json(task);
        })
        }
        catch (e){
            next(ErrorApi.badRequest(e.message));
        } 
    }
    async getAll(req, res){
        let {categoryId, name} = req.query
        let publication
        if(name) {
            publication = await Publication.findAndCountAll({include: {
                model: Discount
            }, where: 
            {
                name
            }})
        }
        else if(categoryId){
            publication = await Publication.findAndCountAll({include: {
                model: Discount
            }, where: {categoryId}})
            console.log(publication)
        }
        else{
            publication = await Publication.findAndCountAll({include: {
                model: Discount
            }})
            console.log('JSON.stringify(publication)')
        }
        res.json(publication);
    }
    async getOne(req, res){
        let param = req.params.id;
        console.log(param);
        const data = await Publication.findOne({include: {
            model: Discount
        }, where: {id: param}})
        res.json(data);
    }
    async deleteOne(req, res){
        try{
            const {name} = req.body;
            const {id} = await Publication.findOne({where: {name: name}})
            if(id){
                await Publication.destroy({where: {id: id}}).then(
                    res.json('Deleted!')
                )
            }
            else{
                res.json('Такого блюда не существует!')
            }
        }
        catch (e) {
            res.json(e)
        }
    }
}

module.exports = new PublicationController()