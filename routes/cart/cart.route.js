const router = require('express').Router();

const authMiddleware = require('../../middlewares/auth.middleware')
const controller = require('../../controllers/cart/cart.controller')




router.use(authMiddleware)


router.post('/', controller.addToCart);

router.post('/increment/', controller.incrementItem)

router.post('/decrement/', controller.decrementItem)




module.exports = router;