const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')

const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', categoryController.getAll)
router.get('/:id', categoryController.getOne)
router.post('/', checkRole('worker'), categoryController.create)
router.delete('/', checkRole('worker'), categoryController.deleteOne)

module.exports = router