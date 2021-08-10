const router = require('express').Router()
const { models: { Order, Product, Order_Item }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

/* shouldn't editing the order be a front end  thing?
router.put('/edit', async (req, res, next) => {
    try{


    }
    catch(ex){
        next(ex)
    }
})
*/


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