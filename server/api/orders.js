const router = require("express").Router();
const {
  models: { Order, Product },
} = require("../db");

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

module.exports = router;
