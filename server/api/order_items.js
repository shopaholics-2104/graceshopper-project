const router = require("express").Router();
const {
  models: { Order_Item },
} = require("../db");

router.get("/:orderId", async (req, res, next) => {
  res.status(200).send(
    await Order_Item.findAll({
      where: {
        orderId: req.params.orderId,
      },
    })
  );
});
router.post("/", async (req, res, next) => {
  try {
    const newItem = await Order_Item.create(req.body);
    res.status(200).send(Order_Item.findByPk(newItem.id, { include: All }));
  } catch (er) {
    console.log(er);
  }
});

module.exports = router;
