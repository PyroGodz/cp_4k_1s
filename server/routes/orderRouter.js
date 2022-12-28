const Router = require('express')
const router = new Router()

const orderController = require('../controllers/orderController')

const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

// ------- Заказы  ------- //
router.get('/', checkRole('ADMIN') , orderController.getAll)
router.post('/', checkRole('worker'), authMiddleware , orderController.create)


module.exports = router