const { Publication, BasketDevice, Basket } = require("../models/models")

class BasketController {
    // ------ CRUD корзины ------ //

    async addToBasket(req,res,next){
        const user = req.user
        const {publicationId} = req.body
        const basket = await BasketDevice.create({basketId : user.id, publicationId : publicationId})
        return res.json(basket)
    }

    async getBasket(req,res,next){
        const id = req.user
        const {createdAt} = req.body
        const basket = await BasketDevice.findAndCountAll({include: {
            model: Publication
        }, where: {createdAt: createdAt, basketId: id}})
        return res.json(basket)
    }

    async getBasketUser(req,res){
        const {id} = req.user
        const basket = await BasketDevice.findAll({include: {
                model: Publication
            }, where: {basketId: id}})

        return res.json(basket)
    }

}

module.exports = new BasketController()