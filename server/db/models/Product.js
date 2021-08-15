const Sequelize = require("sequelize");
const { STRING, TEXT, DECIMAL, ENUM } = Sequelize;

const db = require("../db");

const Product = db.define("product", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  description: {
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  single_price: {
    type: DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  dozen_price: {
    type: DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  status: {
    type: ENUM("out_of_stock", "in_stock", "running_low"),
  },

  imageUrl: {
    type: STRING,
    allowNull: false,
    defaultValue: "https://placekitten.com/200/300",
  },
});

module.exports = Product;
