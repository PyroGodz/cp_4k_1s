const {Category} = require('../models/models')

class CategoryController {
    async create(req, res) {
        const {name} = req.body;
        await Category.create({name,}).then(task =>{
            res.json(task);
        })
    }
    async getAll(req, res){
        const category = await Category.findAll()
        return res.json(category)
    }
    async getOne(req, res){
        let param = req.params.id;
        console.log(param);
        await Category.findOne({where: {id: param}}).then(
            user=>{
                res.json(user);
            }
        )
    }
    async deleteOne(req, res){
        try{
            let param = req.params.id;
            console.log(param);
            await Category.destroy({where: {id: param}}).then(
                res.json('Deleted!')
            )
        }
        catch (e) {
            res.json('Fail')
        }
    }
}

module.exports = new CategoryController()