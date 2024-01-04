const Sequelize = require("sequelize");

const sequelize = require("../db");

const Class = sequelize.define("class", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  className: Sequelize.STRING,

});

module.exports = Class;
