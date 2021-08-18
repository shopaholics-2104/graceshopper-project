const router = require("express").Router();
const {
  models: { Product },
} = require("../db");

//get all products even if not in stock
router.get("/", async (req, res, next) => {
  try {


    const products = await Product.findAll({ include: { all: true } });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

//get only in stock products
router.get("/in_stock", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        status: "in_stock",
      },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

//get out of stock products
router.get("/out_of_stock", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        status: "out_of_stock",
      },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

//get products that are running low
router.get("/running_low", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        status: "running_low",
      },
    });
    res.json(products);
  } catch (err) {
    next(err);

  }
});

//get specific product
router.get("/:id", async (req, res, next) => {
  try {
    const single_product = await Product.findByPk(req.params.id, {
      include: { all: true },
    });
    res.json(single_product);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const productToUpdate = await Product.findByPk(req.params.id, {
      include: { all: true },
    });
    productToUpdate.update(req.body);
    res.json(productToUpdate);
  } catch (err) {
    next(err);

  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});


//for pagination
router.get("/pagination/:idx?", async (req, res, next) => {
  try {
    const pageSize = process.env.PAGE_SIZE || 4;
    const idx = req.params.idx ? req.params.idx * 1 : 0;

    const [total, products] = await Promise.all([
      Product.count(),
      Product.findAll({ limit: pageSize, offset: pageSize * idx }),
    ]);
    res.send({
      total,
      products,
    });
  } catch (err) {
    next(err);
  }
});



//missing error handling router


module.exports = router;
