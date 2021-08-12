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
  const openOrder = await Order.findOne({
    where: {
      userId: req.params.userId,
      status: "New",
    },
    include: {
      model: Product,
    },
  });
  openOrder
    ? res.status(200).send(openOrder)
    : res.status(200).send(
        await Order.create({
          userId: req.params.userId,
          status: "New",
          totalAmount: 0.0,
          products: [],
        })
      );
});

// router.get("/checkItem/:userId", async (req, res, next) => {
//   try {
//     const openOrder = await Order.findOne({
//       where: {
//         userId: req.params.userId,
//         status: "New",
//       },
//     });

//     res.status(200).send(await openOrder.has)
//   } catch (er) {
//     next(er);
//   }
// });
//this is a post request for single product when only userId & product.id are passed into server
router.post("/:userId", async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const userId = req.params.userId;

    const product = await Product.findByPk(productId);
    const openOrder = await Order.findOne({
      where: {
        userId,
        status: "New",
      },
      include: {
        model: Product,
      },
    });

    const newOpenOrder = openOrder
      ? openOrder
      : await Order.create({
          userId,
          status: "New",
          totalAmount: 0.0,
        });

    await newOpenOrder.addProduct(product, {
      through: req.body,
    });
    // const result = await Order.findOne({
    //   where: {
    //     userId,
    //     status: "New",
    //   },
    //   include: {
    //     model: Product,
    //   },
    // });

    const result = await newOpenOrder.hasProduct(productId);
    res.status(200).send(result);
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
