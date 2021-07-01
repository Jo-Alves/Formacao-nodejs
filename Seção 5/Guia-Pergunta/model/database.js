const sequelize = require("sequelize")

const connection = new sequelize('guiaperguntas', 'root', 'cdfvagps', {
	host: 'localhost',
	dialect: 'mysql'
})

module.exports = connection