const router = require('express').Router();
const { Category, Product} = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products=
    try {
        const categoryData = await Category.findAll({
          include: [Product],
        });
        res.status(200).json(categoryData);
      } catch (err) {
        res.status(500).json(err);
      }
    
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
    try {
        const categoryData = await Category.findByPk(req.params.id, {
          include: [{ model: Product, through:ProductTag, as: 'product_id' }],
        });
    
        if (!categoryData) {
          res.status(404).json({ message: 'No category with that id!' });
          return;
        }
    
        res.status(200).json(categoryData);
      } catch (err) {
        res.status(500).json(err);
      }
});


router.post('/', async (req, res) => {
  // create a new category
    try {
        const categoryData = await Category.create({
          reader_id: req.body.reader_id,
        });
        res.status(200).json(categoryData);
      } catch (err) {
        res.status(400).json(err);
      }
  
});


router.put('/:id', async (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  // update a category by its `id` value
});

  // delete a category by its `id` value
  router.delete('/:id', async (req, res) => {
    try {
      const categoryData = await Category.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with that id!' });
        return;
      }
  
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }

});

module.exports = router;
