const router = require('express').Router();

const authMiddleware = require('../../middlewares/auth.middleware')
const controller = require('../../controllers/checkout/checkout.controller')




router.use(authMiddleware)


router.post('/', controller.checkout)









module.exports = router;