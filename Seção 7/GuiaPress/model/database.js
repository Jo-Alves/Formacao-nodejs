const Sequelize = require("sequelize")

const connection = new Sequelize('guiapress', 'root', 'cdfvagps', {
	host: 'localhost',
	dialect: 'mysql'
});

module.exports = connection