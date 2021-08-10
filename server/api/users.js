const router = require('express').Router()
const { models: { User, Order}} = require('../db')
module.exports = router

router.get('/', async(req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
})

//show user's order history
router.get('/:id/history', async(req, res, next)=>{
  try{
    const orders = await Order.findAll({
      where: {
        userId: req.params.id
      }
    })
    res.json(orders)
  }
  catch(ex){
    next(ex)
  }
})

router.post('/', async(req, res, next)=> {
  try{
    res.status(201).send(await User.create(req.body))
  }
  catch(ex){
    next(ex)
  }
})

router.delete('/:id', async(req, res, next)=> {
  try{
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.sendStatus(204);
  }
  catch(ex){
    next(ex)
  }
})
