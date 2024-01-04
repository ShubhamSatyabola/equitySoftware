const Sequelize = require("sequelize");

const sequelize = require("../db");

const Student = sequelize.define("student", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  studentName: Sequelize.STRING,
  profile: {
    type: Sequelize.BLOB("long"), // 'long' is used for large binary data (like images)
    allowNull: true,
  },
});

module.exports = Student;
