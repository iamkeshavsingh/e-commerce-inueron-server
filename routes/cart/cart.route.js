const router = require('express').Router();

const authMiddleware = require('../../middlewares/auth.middleware')





router.use(authMiddleware)










module.exports = router;