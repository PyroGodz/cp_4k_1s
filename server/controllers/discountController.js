const {Discount} = require('../models/models')
const ErrorApi = require('../error/errorApi')

class DiscountController {
    async create(req, res) {
        const {discount} = req.body;
        console.log(req.body)
        await Discount.create({discount}).then(task =>{
            res.json(task);
        })
    }
    async getAll(req, res){
        const category = await Discount.findAll()
        return res.json(category)
    }
    async getOne(req, res){
        let param = req.params.id;
        console.log(param);
        await Discount.findOne({where: {id: param}}).then(
            user=>{
                res.json(user);
            }
        )
    }
    async deleteOne(req, res){
        try{
            const {discount} = req.body;
            const {id} = await Discount.findOne({where: {discount: discount}}).catch(
                console.log('Такой категории не существует!')
                )
            await Discount.destroy({where: {id: id}}).then(
                res.json('Deleted!')
            )
        }
        catch (e) {
            res.json(e)
        }
    }
}

module.exports = new DiscountController();