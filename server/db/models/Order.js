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

Order.prototype.updateItem = async (openOrder, itemInfo) => {
  const item = (
    await openOrder.getProducts({ where: { id: itemInfo.productId } })
  )[0];

  item.order_item.quantity = itemInfo.quantity;
  await item.order_item.save();
  return item;
};

module.exports = Order;
