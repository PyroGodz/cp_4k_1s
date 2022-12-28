const jwt = require('jsonwebtoken')
const ApiError = require('../error/errorApi')
const tokenService = require('../service/token-service')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const accessToken = req.headers.authorization.split(' ')[1]
        console.log(accessToken)
        if (!accessToken) {
            return res.next(ApiError.UnauthorizeError())
        }
        console.log('hi')
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return res.next(ApiError.UnauthorizeError())
        }
        req.user = userData
        next()
    } catch (e) {
        res.status(401).json({message: "Не авторизован"})
    }
};