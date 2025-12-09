const List = require('../database/lists');

module.exports = async function checkListOwner(req, res, next) {
  try {
    const list = await List.findByPk(req.params.id);

    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }

    // Admins can manage anything
    if (req.user.role === 'admin') {
      req.list = list;
      return next();
    }

    // Check owner
    if (list.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to modify this list' });
    }

    req.list = list;
    next();
  } catch (err) {
    next(err);
  }
};