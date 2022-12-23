const Router = require('express')
const router = new Router()
const commentController = require('../controllers/commentController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get('/', checkRole('ADMIN'), commentController.getAll);
router.post('/', commentController.create);

module.exports = router