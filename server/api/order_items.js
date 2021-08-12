const router = require("express").Router();
const {
  models: { Order_Item, Product },
} = require("../db");
const Order = require("../db/models/Order");

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
    res.status(200);
  } catch (er) {
    console.log(er);
  }
});


//DELETE items from cart => api/cart/:productId
router.put('/:productId', async(req, res, next) => {
  try {
    
    const cart = await Order.findOne({
      where:{
         status: 'New', userId: req.body.userId
      }
    })
    const product = await Product.findByPk(req.params.productId)
    await cart.removeProduct(product)
    res.send(product)
  } catch(err) {
    next(err)
  }
})

module.exports = router;
