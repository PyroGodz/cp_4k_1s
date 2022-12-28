const Router = require('express')
const router = new Router()
const publicationController = require('../controllers/publicationController')

const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', publicationController.getAll)
router.get('/:id', publicationController.getOne)
router.post('/', checkRole('worker'), publicationController.create)
router.delete('/', checkRole('worker'), publicationController.deleteOne)

module.exports = router