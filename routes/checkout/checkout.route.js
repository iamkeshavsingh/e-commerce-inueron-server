const router = require('express').Router();

const authMiddleware = require('../../middlewares/auth.middleware')
const controller = require('../../controllers/checkout/checkout.controller')




router.use(authMiddleware)


router.post('/', controller.checkout)

// TODO: We need to create a route to verify payment








module.exports = router;