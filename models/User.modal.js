const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs');

const sequelize = require('../config/db.config')

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'users',
})

User.addHook('beforeCreate', function (user) {
    var password = user.password
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    user.password = hash;
})

User.verifyPassword = function (password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = User