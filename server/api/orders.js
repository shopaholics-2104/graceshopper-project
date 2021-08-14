const router = require("express").Router();
const {
  models: { Order, Product, Order_Item },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  res.status(200).send(
    await Order.findAll({
      where: {
        userId: req.params.userId,
      },
      include: {
        model: Product,
      },
    })
  );
});

router.get("/open/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  const openOrder = Order.prototype.findOrCreateOpenOrder(userId);
  res.status(200).send(openOrder);
});

//this is a post request for single product when only userId & product.id are passed into server
router.post("/:userId", async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const userId = req.params.userId;

    const product = await Product.findByPk(productId);
    const openOrder = await Order.prototype.findOrCreateOpenOrder(userId);
    const addedItem = await Order.prototype.addItem(
      openOrder,
      product,
      req.body
    );

    res.status(200).send(addedItem);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    await order.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});
