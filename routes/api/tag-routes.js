const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: ProductTag, through:Tag , as: 'tagged_product' }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value

});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
