const { DataTypes } = require('sequelize');
const sequelize = require('./config');
const User = require('./users');

const List = sequelize.define('lists', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Relationship
List.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(List, { foreignKey: 'userId' });

module.exports = List;