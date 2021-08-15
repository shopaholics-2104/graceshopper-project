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

  res
    .status(200)
    .send(await Order.prototype.findOrCreateOpenOrder(req.params.userId));

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

router.put("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    res.status(200).send(await order.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.post("/:userId", async (req, res, next) => {
  try {
    const openOrder = await Order.prototype.findOrCreateOpenOrder(
      req.params.userId
    );
    const product = await Product.findByPk(req.body.productId);
    res
      .status(200)
      .send(await Order.prototype.addItem(openOrder, product, req.body));
  } catch (er) {
    console.log(er);
  }
});

//UPDATE item quantity in cart
router.put("/updateItem/:orderId", async (req, res, next) => {
  try {
    const openOrder = await Order.findByPk(req.params.orderId);

    res.status(200).send(await Order.prototype.updateItem(openOrder, req.body));
  } catch (err) {
    console.log(err);
  }
});
