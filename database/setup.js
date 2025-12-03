const sequelize = require('./config');
const User = require('./User');
const List = require('./List');
const Item = require('./Item');

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