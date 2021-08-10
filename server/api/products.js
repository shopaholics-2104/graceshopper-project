const router = require("express").Router();
const {
  models: { Product },
} = require("../db");

router.get("/", async (req, res, next) => {
  res.status(200).send(await Product.findAll());
});

router.get("/:id", async (req, res, next) => {
  res.status(200).send(await Product.findByPk(req.params.id));
});

module.exports = router;
