const router = require('express').Router();
const { body } = require('express-validator')
const UserModal = require('../../models/User.modal')

const authController = require('../../controllers/auth/auth.controller')
const errorMiddleware = require('../../middlewares/error.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');


function nameValidator(name) {
    var pattern = /^[a-zA-Z ]{2,}$/;
    if (!name.match(pattern)) return false;
    return true;
}


function usernameValidator(username) {
    return UserModal.findOne({ where: { username: username } })
        .then(response => {
            if (response) return Promise.reject();
        })
}


router.post('/signin', authController.signin);

router.post('/signup', [
    body('username')
        .not()
        .isEmpty()
        .withMessage('Username is required')
        .bail()
        .custom(usernameValidator)
        .withMessage('Username is Taken'),
    body('name')
        .not()
        .isEmpty()
        .withMessage('Name is required')
        .custom(nameValidator)
        .withMessage('Name is invalid'),
    body('password')
        .not()
        .isEmpty()
        .withMessage('Password is required')

], errorMiddleware, authController.signup);

router.post('/logout', authController.logout);

router.post('/verifyToken', authMiddleware, authController.verifyToken);





module.exports = router;