const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/db.config')

class Cart extends Model { }

Cart.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'carts',
})

module.exports = Cart
