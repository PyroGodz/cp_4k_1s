const ErrorApi = require("../error/errorApi")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Basket} = require('../models/models');
const {hash} = require("bcrypt");
const {validationResult} = require('express-validator')
const TokenService = require('../service/token-service');
const tokenService = require("../service/token-service");

const generateJwt = (id, login, role) => {
    return jwt.sign({id, login, role}, process.env.SECRET_KEY,{expiresIn: '12h'});
}
const generateJwtRefresh = (id, login, role) => {
    return jwt.sign({id, login, role}, process.env.JWT_REFRESH_SECRET,{expiresIn: '24h'});
}

class UserController {
    async registration(req, res, next) {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({message: "Ошибка регистрации", errors})
        }
        const {login, password, role} = req.body
        if (!login || !password) {
            return next(ErrorApi.badRequest('Некорректный login или password'))
        }
        const candidate = await User.findOne({where: {login}})
        if (candidate) {
            return next(ErrorApi.badRequest('Пользователь с таким login уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 6)
        const user = await User.create({login, role, password: hashPassword})
        const token = generateJwt(user.id, user.login, user.role)
        const refreshToken = generateJwtRefresh(user.id, user.login, user.role)
        // const tokens = tokenService.generateTokens(user.id,user.login, user.role)
        // res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30* 24* 60* 60 * 1000, httpOnly: true})
        return res.cookie('refreshToken', refreshToken, {maxAge: 30* 24* 60* 60 * 1000, httpOnly: true}).json({token})
    }

    async login(req, res, next) {
        const {login, password} = req.body
        const user = await User.findOne({where: {login}})
        if (!user) {
            return next(ErrorApi.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ErrorApi.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.login, user.role)
        const refreshToken = generateJwtRefresh(user.id, user.login, user.role)
        return res.cookie('refreshToken', refreshToken, {maxAge: 30* 24* 60* 60 * 1000, httpOnly: true}).json({token})
    }
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.login, req.user.role)
        const refreshToken = generateJwtRefresh(req.user.id, req.user.login, req.user.role)
        return res.cookie('refreshToken', refreshToken, {maxAge: 30* 24* 60* 60 * 1000, httpOnly: true}).json({token})
    }
    async refresh(refreshToken) {
        try{
            const {refreshToken} = req.cookies;
            if(!refreshToken){
                throw ErrorApi.UnauthorizeError();
            }
            const userData = validateRefreshToken(refreshToken)
            if(!userData){
                throw Error.UnauthorizeError();
            }

            const token = generateJwt(user.id, user.login, user.role)
            const newRefreshToken = generateJwtRefresh(user.id, user.login, user.role)
            return res.cookie('refreshToken', newRefreshToken, {maxAge: 30* 24* 60* 60 * 1000, httpOnly: true}).json({token})
        }
        catch (e) {

        }
    }
    validateAccessToken(token){
        try{
            const userData = jwt.verify(token, process.env.SECRET_KEY)
            console.log(userData)
            return userData
        }catch (e) {
            return null
        }
    }

    validateRefreshToken(token){
        try{
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

    getRole(token){
        try{
            const role = jwt.decode(token)
            res.json(role)
        }catch (e) {
            return null
        }
    }
}
module.exports = new UserController();