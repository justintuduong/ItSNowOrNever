const Sequelize = require("sequelize")

module.exports = sequelize.define("User", {
    id: { 
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: { type: Sequelize.STRING(225), allowNull: false },
    lastName: { type: Sequelize.STRING(225), allowNull: false }

});