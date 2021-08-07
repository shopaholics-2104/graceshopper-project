const Sequelize = require("sequelize");
const db = require("../db");

const Order_Item = db.define("order_item", {
  qty: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: Sequelize.FLOAT,
  },
});

module.exports = Order_Item;
