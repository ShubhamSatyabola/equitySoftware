const Sequelize = require("sequelize");

const sequelize = require("../db");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  role: Sequelize.STRING,
  email: { type: Sequelize.STRING, unique: true },
  profile: {
    type: Sequelize.BLOB("long"), // 'long' is used for large binary data (like images)
    allowNull: true,
  },
  password: Sequelize.STRING,
});

module.exports = User;
