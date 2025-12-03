const { DataTypes } = require('sequelize');
const sequelize = require('./config');
const List = require('./lists');

const Item = sequelize.define('items', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  purchased: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

// Relationship
Item.belongsTo(List, { foreignKey: 'listId' });
List.hasMany(Item, { foreignKey: 'listId' });

module.exports = Item;