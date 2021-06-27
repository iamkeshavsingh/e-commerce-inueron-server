const router = require('express').Router();

const auth = require('./auth/auth.route');
const cart = require('./cart/cart.route');
const checkout = require('./checkout/checkout.route');
const order = require('./order/order.route');
const product = require('./product/product.route');






router.use('/auth', auth);
router.use('/cart', cart);
router.use('/checkout', checkout);
router.use('/order', order);
router.use('/product', product);




module.exports = router;