const _ = require('lodash');

const { getToken } = require('../../utils/jwt.util')
const UserModel = require('../../models/User.modal')
exports.signin = function (req, res) {
    var { username, password } = req.body;
    var errorObj = {
        success: false,
        msg: "Username and Password doesn't exist"
    };
    let user;
    UserModel.findOne({
        where: {
            username: username,
        }
    })
        .then(currentUser => !currentUser ? Promise.reject('invalid') : currentUser)
        .then(currentUser => (user = currentUser.toJSON()))
        .then(user => UserModel.verifyPassword(password, user.password))
        .then(isUserValid => isUserValid ? _.omit(user, 'password') : Promise.reject('invalid'))
        .then(user => getToken({ id: user.id, name: user.name }))
        .then(token => res.json({ token, name: user.name, userId: user.id }))
        .catch(err => {
            console.log(err)
            if (err === 'invalid') return res.status(400).json(errorObj)
        })
}



exports.signup = function (req, res) {

    var { username, password, name } = req.body;
    UserModel.create({ username, password, name })
        .then(user => res.json(user))
}


exports.logout = function (req, res) {


}


exports.verifyToken = function (req, res) {
    return res.json({
        name: req.user.name,
        userId: req.user.id
    })
}