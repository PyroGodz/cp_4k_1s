const {Comment} = require('../models/models')
const ErrorApi = require('../error/errorApi')

class commentsController {
    async create(req, res, next) {
        let {UserId, PublicationId, message} = req.body;
        await Comment.create({UserId, PublicationId, message}).then(task => {
            res.json(task);
        });
    }
    async getAll(req, res){
        await Comment.findAll().then(task =>{
            res.json(task);
        })
    }
}

module.exports = new commentsController();