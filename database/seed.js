const sequelize = require('./config');
const User = require('./users');
const List = require('./lists');
const Item = require('./items');

async function seed() {
  try {
    await sequelize.sync({ force: true }); // reset database

    // Create users
    const user1 = await User.create({ email: 'alice@example.com', password: 'password123' });
    const user2 = await User.create({ email: 'bob@example.com', password: 'password123' });

    // Create lists
    const list1 = await List.create({ name: 'Weekly Groceries', userId: user1.id });
    const list2 = await List.create({ name: 'Party Supplies', userId: user2.id });

    // Create items
    await Item.create({ name: 'Milk', purchased: false, listId: list1.id });
    await Item.create({ name: 'Bread', purchased: true, listId: list1.id });
    await Item.create({ name: 'Soda', purchased: false, listId: list2.id });
    await Item.create({ name: 'Chips', purchased: true, listId: list2.id });

    console.log('Database seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
  }
}