const express = require('express');
const router = express.Router();
const Item = require('../database/items');

//Imports for auth
const verifyToken = require('../middleware/verifyToken');
const checkItemOwner = require('../middleware/checkItemOwner');

// Role middleware  
const roleMiddleware = require('../middleware/role');

// Get all items
router.get('/', verifyToken, async (req, res, next) => {
  try {
    const filter = {};

    // Name search filter
    if (req.query.name) {
      const { Op } = require('sequelize'); // make sure Sequelize Op is imported
      filter.name = { [Op.like]: `%${req.query.name}%` };
    }

    //purchase status filter
    if (req.query.purchased !== undefined) {
      filter.purchased = req.query.purchased === 'true';
    }

    //pagination
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
    const offset = (page - 1) * limit;

    const items = await Item.findAll({
      where: filter,  //  filter
      limit,          //  limit results
      offset,         //  skip first 15
    });

    res.json(items);
  } catch (err) {
    next(err);
  }
});


// Get item by ID
router.get('/:id', verifyToken, async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// Create item (if logged in user)
router.post('/', verifyToken, async (req, res, next) => {
  try {
    const { name, purchased, listId } = req.body;
    if (!name) return res.status(400).json({ error: { message: 'Name is required' } });

    const newItem = await Item.create({ 
      name, 
      purchased: purchased || false, listId });

    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
});

// Update item (owner/admin)
router.put('/:id', verifyToken, roleMiddleware('admin'), checkItemOwner, async (req, res, next) => {
  try {
    await req.item.update(req.body);
    res.json(req.item);
  } catch (err) {
    next(err);
  }
});

// Delete item (owner/admin)
router.delete('/:id', verifyToken, roleMiddleware('admin'), checkItemOwner, async (req, res, next) => {
  try {
    await req.item.destroy();
    res.json({ message: 'Item deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;