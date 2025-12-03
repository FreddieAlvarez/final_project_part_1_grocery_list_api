const express = require('express');
const router = express.Router();
const List = require('../database/lists');

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
router.post('/', async (req, res) => {
  try {
    const list = await List.create(req.body);
    res.status(201).json(list);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update list
router.put('/:id', async (req, res) => {
  try {
    const list = await List.findByPk(req.params.id);
    if (!list) return res.status(404).json({ error: 'List not found' });
    await list.update(req.body);
    res.json(list);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete list
router.delete('/:id', async (req, res) => {
  try {
    const list = await List.findByPk(req.params.id);
    if (!list) return res.status(404).json({ error: 'List not found' });
    await list.destroy();
    res.json({ message: 'List deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;