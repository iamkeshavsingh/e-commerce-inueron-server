const CartModal = require('../../models/Cart.modal');
const ProductModal = require('../../models/Product.modal')

exports.addToCart = (req, res) => {
    var { productId } = req.body;
    var userId = req.user.id;

    if (!productId || !userId) {
        return res.json({
            success: false,
            msg: 'Bad Request'
        })
    }

    function getCartData(price) {
        return {
            quantity: 1,
            price,
            UserId: userId,
            ProductId: productId
        }
    }

    ProductModal.findByPk(productId)
        .then(data => data.toJSON())
        .then(product => product.price)
        .then(price => CartModal.create(getCartData(price)))
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
        })
}


exports.incrementItem = (req, res) => {
    var { cartId } = req.body;
    var userId = req.user.id;

    if (!cartId || !userId) {
        return res.json({
            success: false,
            msg: 'Bad Request'
        })
    }

    CartModal.findByPk(cartId)
        .then(data => data.toJSON())
        .then(cart => ({ price: cart.price, quantity: cart.quantity }))
        .then(data => CartModal.update({ quantity: data.quantity + 1, price: Number(data.price) + (data.price / data.quantity) }, {
            where: {
                id: cartId
            }
        }))
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
        })
}


exports.decrementItem = (req, res) => {
    var { cartId } = req.body;
    var userId = req.user.id;

    if (!cartId || !userId) {
        return res.json({
            success: false,
            msg: 'Bad Request'
        })
    }

    CartModal.findByPk(cartId)
        .then(data => data.toJSON())
        .then(cart => ({ price: cart.price, quantity: cart.quantity }))
        .then(data => data.quantity > 1 ? CartModal.update({ quantity: data.quantity - 1, price: data.price - (data.price / data.quantity) }, {
            where: {
                id: cartId
            }
        }) : CartModal.destroy({ where: { id: cartId } }))
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
        })
}