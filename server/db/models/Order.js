const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  status: {
    type: Sequelize.ENUM("New", "CheckOut", "Paid", "Completed"),
  },
  comment: { type: Sequelize.TEXT },
});

module.exports = Order;
