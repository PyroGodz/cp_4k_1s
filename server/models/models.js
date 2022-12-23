const sequelize = require('../db')
const {DataTypes} = require('sequelize');

const Basket = sequelize.define( 'basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const BasketDevice = sequelize.define( 'basket_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Publication = sequelize.define( 'publication', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    price: {type: DataTypes.DECIMAL},
    discount: {type: DataTypes.DECIMAL},
    img: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING}
})

const Category = sequelize.define( 'category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING}
})

const Comment = sequelize.define( 'comment',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    message: {type: DataTypes.STRING}
})

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

User.hasOne(Comment)
Comment.belongsTo(User)

Publication.hasOne(Comment)
Comment.belongsTo(Publication)

Category.hasOne(Publication)
Publication.belongsTo(Category)

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Publication.hasMany(BasketDevice)
BasketDevice.belongsTo(Publication)



module.exports = {
    Publication,
    Category,
    User,
    Comment,
    Basket,
    BasketDevice
}