const {sequelize} = require('./config');
const User = require('./users');
const List = require('./lists');
const Item = require('./items');

async function setupDatabase() {
  try {
    await sequelize.sync({ force: true }); 
    console.log('Database setup complete!');
  } catch (err) {
    console.error('Error setting up database:', err);
  }
}

module.exports = setupDatabase;