const {Order, Basket} = require('../models/models')


class OrderController {
    async create(req, res) {
        const {id} = req.user;
        const {summary} = req.body;
        const basket = await Basket.findOne({where: {userId: id}})
        console.log(id)
        console.log(summary)
        console.log('id')
        const order = await Order.create({userId: id, basketId: basket.id, summary: summary})
        const baskets = await Basket.update({orderId: order.id}, {
            where: {
                userId: id,
                orderId: null
            }
        })
        console.log(baskets)
        return res.json(order)
    }
    async getAll(req, res){
        const orders = await Order.findAll()
        return res.json(orders)
    }
}

module.exports = new OrderController()