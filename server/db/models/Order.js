const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  status: {
    type: Sequelize.ENUM("New", "CheckOut", "Paid", "Completed"),
  },
  comment: { type: Sequelize.TEXT },
  totalAmount: {
    type: Sequelize.FLOAT,
    defaultValue: 0.0,
  },
});


Order.prototype.findOrCreateOpenOrder = async (userId) => {
  const [openOrder] = await Order.findOrCreate({
    where: {
      userId,
      status: "New",
    },
    include: {
      all: true,
    },
  });

  return openOrder;
};

Order.prototype.addItem = async (openOrder, product, itemInfo) => {
  if (await openOrder.hasProduct(product.id)) {
    const item = (
      await openOrder.getProducts({ where: { id: product.id } })
    )[0];
    item.order_item.quantity += itemInfo.quantity;
    await item.order_item.save();
    return item;
  } else {
    await openOrder.addProduct(product, {
      through: itemInfo,
    });
  }

  return (
    await openOrder.getProducts({
      where: {
        id: product.id,
      },
    })
  )[0];
}

Order.prototype.updateItem = async (openOrder, itemInfo) => {
  const item = (
    await openOrder.getProducts({ where: { id: itemInfo.productId } })
  )[0];

  item.order_item.quantity = itemInfo.quantity;
  await item.order_item.save();
  return item;

};

module.exports = Order;
