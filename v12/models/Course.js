const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Course = sequelize.define("Course", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  espb: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  semester: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Course;
