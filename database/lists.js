const { DataTypes } = require('sequelize');
const sequelize = require('./config');
const User = require('./User');

const List = sequelize.define('List', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Relationship
List.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(List, { foreignKey: 'userId' });

module.exports = List;