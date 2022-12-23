const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.getAll)
router.get('/:id', categoryController.getOne)
router.post('/', categoryController.create)
router.delete('/:id', categoryController.deleteOne)

module.exports = router