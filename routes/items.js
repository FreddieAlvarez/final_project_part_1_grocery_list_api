const express = require('express');
const router = express.Router();
const Item = require('../database/items');

//Imports for auth
const verifyToken = require('../middleware/verifyToken');

// Get all items
router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (err) {
    next(err);
  }
});

// Get item by ID
router.get('/:id', async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// Create item
router.post('/', verifyToken, async (req, res, next) => {
  try {
    const { name, purchased, listId } = req.body;
    if (!name) return res.status(400).json({ error: { message: 'Name is required' } });
    const newItem = await Item.create({ name, purchased: purchased || false, listId });
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
});

// Update item
router.put('/:id', verifyToken, async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// Delete item
router.delete('/:id', verifyToken, async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    await item.destroy();
    res.json({ message: 'Item deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;