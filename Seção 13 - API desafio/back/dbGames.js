const sequelize = require("sequelize");
const dbConnection = require("./db");

const games = dbConnection.define("games", {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: sequelize.STRING,
        allowNull: true
    },
    year: {
        type: sequelize.INTEGER,
        allowNull: true
    },
    price: {
        type: sequelize.DECIMAL,
        allowNull: true
    }
})

games.sync({ force: false }).then(() => { })

module.exports = games;