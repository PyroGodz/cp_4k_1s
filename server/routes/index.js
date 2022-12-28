const Router = require('express')
const router = new Router()
const discountRouter = require('./discountRouter')
const categoryRouter = require('./categoryRouter')
const publicationRouter = require('./publicationRouter')
const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter')
const orderRouter = require('./orderRouter')


router.use('/discount', discountRouter)
router.use('/category', categoryRouter)
router.use('/publication', publicationRouter)
router.use('/user', userRouter)
router.use('/basket', basketRouter)
router.use('/order', orderRouter)

module.exports = router