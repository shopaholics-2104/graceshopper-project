const Sequelize = require("sequelize");
const { STRING, ENUM } = Sequelize;

const db = require("../db");

const Category = db.define("category", {
  flavor: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Category;
