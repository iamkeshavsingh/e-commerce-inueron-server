const User = require('./User.modal')
const Product = require('./Product.modal')
const Cart = require('./Cart.modal')
const Order = require('./Order.modal')


User.hasMany(Cart)
User.hasMany(Order)

Product.hasMany(Cart)
Product.hasMany(Order)



module.exports = {
    User,
    Product,
    Cart,
    Order
}