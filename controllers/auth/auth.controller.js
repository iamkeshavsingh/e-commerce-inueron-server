const { getToken } = require('../../utils/jwt.util')
const UserModel = require('../../models/User.modal')
exports.signin = function (req, res) {

    //TODO: Validate the coming data (Server Validations)
    // TODO: Check whether the user exists with this username and password

    // getToken({
    //     username: 'John',
    //     _id: '34234fdfdsfs4353ds'
    // }).then(token => res.json({ token: token }))


    // const query = 'select * from users';
    // connection.query(query, function (err, data) {
    //     res.json(data)
    // });

    // UserModel.findAll().then(data => res.json(data))

    // UserModel.findByPk()

    // UserModel.findOne()

    // UserModel.create({
    //     username: 'michael',
    //     password: '1234',
    //     name: 'Michael'
    // })
    //     .then(data => res.json(data))

    // UserModel.destroy({
    //     where: {
    //         id: 1
    //     }
    // });

    // UserModel.update({
    //     name: 'John'
    // }, {
    //     where: {
    //         id: 2
    //     }
    // });
}



exports.signup = function (req, res) {

}


exports.logout = function (req, res) {


}