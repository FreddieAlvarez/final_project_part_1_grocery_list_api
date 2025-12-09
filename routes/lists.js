const express = require('express');
const router = express.Router();
const List = require('../database/lists');

// Imports for auth
const verifyToken = require('../middleware/verifyToken');

// Get all lists
router.get('/', async (req, res) => {
  try {
    const lists = await List.findAll();
    res.json(lists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get list by ID
router.get('/:id', async (req, res) => {
  try {
    const list = await List.findByPk(req.params.id);
    if (!list) return res.status(404).json({ error: 'List not found' });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create list
router.post('/', verifyToken, async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: { message: 'Name is required' } });
    }
    const newList = await List.create({ name });
    res.status(201).json(newList);
  } catch (err) {
    next(err); // pass error error handler
  }
});

// Update list
router.put('/:id', verifyToken, async (req, res, next) => {
  try {
    const list = await List.findByPk(req.params.id);
    if (!list) return res.status(404).json({ error: 'List not found' });
    await list.update(req.body);
    res.json(list);
  } catch (err) {
    next(err); // pass to error handler
  }
});

// Delete list
router.delete('/:id', verifyToken, async (req, res, next) => {
  try {
    const list = await List.findByPk(req.params.id);
    if (!list) return res.status(404).json({ error: 'List not found' });
    await list.destroy();
    res.json({ message: 'List deleted' });
  } catch (err) {
    next(err); // pass to error handler
  }
});

module.exports = router;