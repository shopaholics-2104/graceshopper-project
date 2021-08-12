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

// // this is a post request for single product when only userId is passed into server
// router.post("/:userId", async (req, res, next) => {
//   try {
//     const product = await Product.findByPk(req.body.product.id);
//     const openOrder = await Order.findOne({
//       where: {
//         userId: req.params.userId,
//         status: "New",
//       },
//       include: {
//         model: Product,
//       },
//     });

//     const newOpenOrder = openOrder
//       ? openOrder
//       : await Order.create({
//           userId: req.params.userId,
//           status: "New",
//           totalAmount: 0.0,
//         });

//     await newOpenOrder.addProduct(product, {
//       through: { quantity: 3, price: 78.99 },
//     });
//     const result = await Order.findOne({
//       where: {
//         userId: req.params.userId,
//         status: "New",
//       },
//       include: {
//         model: Product,
//       },
//     });
//     res.send(result);
//   } catch (err) {
//     console.log(err);
//   }
// });

router.delete("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    await order.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});
