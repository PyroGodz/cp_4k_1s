const Router = require('express')
const router = new Router()
const commentRouter = require('./commentRouter')
const categoryRouter = require('./categoryRouter')
const publicationRouter = require('./publicationRouter')
const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter')


router.use('/comment', commentRouter)
router.use('/category', categoryRouter)
router.use('/publication', publicationRouter)
router.use('/user', userRouter)
router.use('/basket', basketRouter)

module.exports = router