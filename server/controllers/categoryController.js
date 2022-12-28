const {Category} = require('../models/models')

class CategoryController {
    async create(req, res) {
        const {name} = req.body;
        console.log(req.body)
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
            const {name} = req.body;
            const {id} = await Category.findOne({where: {name: name}}).catch(
                console.log('Такой категории не существует!')
                )
            await Category.destroy({where: {id: id}}).then(
                res.json('Deleted!')
            )
        }
        catch (e) {
            res.json(e)
        }
    }
}

module.exports = new CategoryController()