const Sequelize = require("sequelize");

const sequelize = require("../db");

const School = sequelize.define("school", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  schoolName: Sequelize.STRING,
  schoolProfile: {
    type: Sequelize.BLOB("long"), // 'long' is used for large binary data (like images)
    allowNull: true,
  },
});

module.exports = School;
