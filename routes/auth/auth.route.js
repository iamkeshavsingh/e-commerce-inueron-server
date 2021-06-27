const router = require('express').Router();

const authController = require('../../controllers/auth/auth.controller')






router.post('/signin', authController.signin);

router.post('/signup', authController.signup);

router.post('/logout', authController.logout);





module.exports = router;