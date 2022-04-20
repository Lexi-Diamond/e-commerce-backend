const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, as: 'tagged_product'}],
    });

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, as: 'tagged_product'}],
    });
    
    if (!tagData) {
      res.status(404).json({ message: 'No tag with that id!'})
      return;
    }
    
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
    try {
        const tagData = await Tag.create({
          tag_id: req.body.tag_id,
        });
        res.status(200).json(tagData);
      } catch (err) {
        res.status(400).json(err);
      }
  
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((updatedProductTag) => 
  {console.log(updatedProductTag); 
    res.json(updatedProductTag)})
  .catch((err) => {
    // console.log(err);
    res.status(400).json(err);
  });
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
    try {
      const tagData = await Tag.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with that id!' });
        return;
      }
  
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
