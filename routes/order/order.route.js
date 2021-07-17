const router = require('express').Router();


const authMiddleware = require('../../middlewares/auth.middleware')
const controller = require('../../controllers/order/order.controller')


router.use(authMiddleware)


router.post('/placeOrder', controller.placeOrder)
router.get('/', controller.getOrders)





module.exports = router;