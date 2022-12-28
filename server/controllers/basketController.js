const { Publication, Basket, Discount } = require("../models/models")
const sequelize = require('sequelize')

class BasketController {
    // ------ CRUD корзины ------ //

    async addToBasket(req,res,next){
        const user = req.user
        const {publicationId} = req.body
        const basket = await Basket.create({userId : user.id, publicationId : publicationId})
        return res.json(basket)
    }

    async getBasketUser(req,res){
        const {id} = req.user
//         const basket = await Basket.findAll({
//             attributes: {
//                 include: [
//                     [
//                         sequelize.literal(`(
//                             select * from baskets join publications on baskets.publicationId  = publications.id
// join discounts on publications.discountId = discounts.id
//                         )`)
//                     ]
//                 ]
//             }, where: 
//             {
//                 userId: id,
//                 orderId: null
//             }})
        // let basket = `select * from baskets join publications on baskets."publicationId"  = publications.id
        // join discounts on publications."discountId" = discounts.id 
        // where baskets."userId" = ${id}`
        // const rawQuery = await models.sequelize.query(basket,
        //     { type: QueryTypes.SELECT })

        const basket = await Basket.findAll({
                            include: {
                                model: Publication,
                                include: {
                                    model: Discount
                                }
                            }, where: 
                        {
                            userId: id,
                            orderId: null
                        }
                    })
        return res.json(basket)
    }

}

module.exports = new BasketController()