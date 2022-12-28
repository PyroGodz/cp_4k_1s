const Router = require('express')
const router = new Router()
const discountController = require('../controllers/discountController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get('/', discountController.getAll);
router.get('/:id', discountController.getOne)
router.post('/', discountController.create);
router.delete('/', discountController.deleteOne)

module.exports = router