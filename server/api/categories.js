const router = require('express').Router()
const { models: { Category }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

router.post('/', async(req, res, next)=> {
  try{
    res.status(201).send(await Category.create(req.body))
  }
  catch(ex){
    next(ex)
  }
})

router.delete('/:id', async(req, res, next)=> {
  try{
    const category = await Category.findByPk(req.params.id);
    await category.destroy();
    res.sendStatus(204);
  }
  catch(ex){
    next(ex)
  }
})
