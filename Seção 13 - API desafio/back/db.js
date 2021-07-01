const Sequelize = require("sequelize");

const dbConnetion = new Sequelize('db_desafio', 'root', 'cdfvagps', {
    host: 'localhost',
    dialect: "mysql"
})

module.exports = dbConnetion