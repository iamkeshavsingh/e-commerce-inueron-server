const CartModal = require('../../models/Cart.modal')
const OrderModal = require('../../models/Order.modal')

exports.placeOrder = (req, res) => {

    var userId = req.user.id;
    var items;

    function mapper(item) {
        var cart = item.toJSON();
        return {
            quantity: cart.quantity,
            price: cart.price,
            UserId: cart.UserId,
            ProductId: cart.ProductId
        };
    }

    CartModal.findAll({ where: { UserId: userId } })
        .then(cartItems => (items = cartItems))
        .then(_ => CartModal.destroy({ where: { UserId: userId } }))
        .then(_ => items.map(mapper))
        .then(data => OrderModal.bulkCreate(data))
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
        })
}