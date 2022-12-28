const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const {check} = require('express-validator')

router.post('/registration', [
    check('login', 'Логин пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть длинной от 4 до 10').isLength({min: 4, max:10})
], userController.registration)
router.post('/login', userController.login)
router.get('/refresh', userController.refresh)
router.get('/auth', authMiddleware, userController.check)
router.get('/role', authMiddleware, userController.getRole)

module.exports = router