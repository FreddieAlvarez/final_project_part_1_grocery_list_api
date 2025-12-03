const sequelize = require('./config');
const User = require('./user');
const List = require('./list');
const Item = require('./item');

async function setupDatabase() {
  try {
    await sequelize.sync({ force: true }); 
    console.log('Database setup complete!');
  } catch (err) {
    console.error('Error setting up database:', err);
  } finally {
    await sequelize.close();
  }
}

setupDatabase();