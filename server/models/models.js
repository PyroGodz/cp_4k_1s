const sequelize = require('../db')
const {DataTypes} = require('sequelize');

const Basket = sequelize.define( 'basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    isOrdered: {type: DataTypes.BOOLEAN}
})

const Publication = sequelize.define( 'publication', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    price: {type: DataTypes.DECIMAL},
    img: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING}
})

const Order = sequelize.define( 'order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    summary: {type: DataTypes.DECIMAL}
})

const Category = sequelize.define( 'category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING}
})

const Discount = sequelize.define( 'discount',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    discount: {type: DataTypes.DECIMAL}
})

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})


Discount.hasOne(Publication, { foreignKey: { allowNull: true }, onDelete: 'CASCADE' })
Publication.belongsTo(Discount, { foreignKey: { allowNull: true }, onDelete: 'CASCADE' })

Category.hasOne(Publication)
Publication.belongsTo(Category)

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

Order.hasOne(Basket)
Basket.belongsTo(Order)

Publication.hasMany(Basket)
Basket.belongsTo(Publication)



module.exports = {
    Publication,
    Category,
    User,
    Discount,
    Basket,
    Order
}