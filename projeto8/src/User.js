const sequelize = require("sequelize");
const db = require("./config/db");

const User = db.define("users", {
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    }
});


User.sync({ force: false }).then(() => {});

module.exports = User;