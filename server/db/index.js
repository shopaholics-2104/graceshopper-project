//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Order_Item = require("./models/OrderItem");
const Order = require("./models/Order");
const Category = require("./models/Category");

//associations could go here!

//this is a one-many association. Column "userId" will be added to Model "Order". Model "Order" will allow multiple instances with same userId.
User.hasMany(Order);
Order.belongsTo(User);

//this is a one-many association. Column "categoryId" will be added to Model "Product". Model "Product" will allow multiple instances with same categoryId.
Category.hasMany(Product);
Product.belongsTo(Category);

//this is a many-many association. One Order can have multiple Products, and one product can also show up under different order. all the entries will be shown under model "Order_Item"
Order.belongsToMany(Product, { through: Order_Item });
Product.belongsToMany(Order, { through: Order_Item });

module.exports = {
  db,
  models: {
    User,
    Product,
    Category,
    Order_Item,
    Order,
  },
};
