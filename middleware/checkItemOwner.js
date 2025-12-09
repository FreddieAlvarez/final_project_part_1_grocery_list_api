const Item = require('../database/items');
const List = require('../database/lists');

module.exports = async function checkItemOwner(req, res, next) {
  try {
    const item = await Item.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const list = await List.findByPk(item.listId);

    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }

    // Admin bypass
    if (req.user.role === 'admin') {
      req.item = item;
      return next();
    }

    // Ownership check
    if (list.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to modify this item' });
    }

    req.item = item;
    next();
  } catch (err) {
    next(err);
  }
};