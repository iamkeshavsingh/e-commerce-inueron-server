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

    function getCartData(product) {
        return {
            quantity: 1,
            UserId: userId,
            ProductId: productId,
            price: product.price
        }
    }
    let product;
    ProductModal.findByPk(productId)
        .then(data => (product = data.toJSON()))
        .then(product => CartModal.create(getCartData(product)))
        .then(data => res.json({ ...data.toJSON(), imageUrl: product.images, title: product.name }))
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


exports.getCartItems = (req, res) => {

    var userId = req.user.id;
    CartModal.findAll({
        where: {
            UserId: userId
        },
        includes: [ProductModal]
    })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
        })
}