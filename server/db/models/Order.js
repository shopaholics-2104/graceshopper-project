const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  status: {
    type: Sequelize.ENUM("New", "CheckOut", "Paid", "Completed"),
  },
  comment: { type: Sequelize.TEXT },
  totalAmount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

module.exports = Order;
