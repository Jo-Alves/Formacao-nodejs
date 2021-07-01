const Sequelize = require("sequelize")
const connection = require("../model/database")
const category = require("../categories/category")

const article = connection.define("articles", {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	slug: {
		type: Sequelize.STRING,
		allowNull: false
	},
	body: {
		type: Sequelize.TEXT,
		allowNull: false
	}
})

category.hasMany(article) // Uma categoria tem muito artigos
article.belongsTo(category) // article pertece a uma categoria

article.sync({force: false})
module.exports = article