const { Sequelize } = require('sequelize');

const { DB, DBUSER, DBPASSWORD, DBHOST } = process.env;

const sequelize = new Sequelize(DB, DBUSER, DBPASSWORD, {
    host: DBHOST,
    dialect: 'mysql'
});


sequelize.authenticate().then(_ => console.log('Connected To Databse'))

module.exports = sequelize;