const Sequelize = require("sequelize");

const dbConnetion = new Sequelize('guipics', 'jodev', 'abc123', {
    host: 'localhost',
    dialect: "mysql"
})

module.exports = dbConnetion