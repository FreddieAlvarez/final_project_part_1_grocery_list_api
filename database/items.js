const { DataTypes } = require('sequelize');
const sequelize = require('./config');
const List = require('./List');

const Item = sequelize.define('Item', {
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