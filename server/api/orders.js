const router = require('express').Router()
const { models: { Order, Product, Order_Item }} = require('../db')
module.exports = router

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




router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})



router.delete('/:id', async(req, res, next)=> {
  try{
    const order = await Order.findByPk(req.params.id);
    await order.destroy();
    res.sendStatus(204);
  }
  catch(ex){
    next(ex)
  }
})

