const Sequelize = require("sequelize");

const sequelize = require("../db");

const ClassGroup = sequelize.define("classGroup", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = ClassGroup;
