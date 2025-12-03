const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

// Import routes
const userRoutes = require('./routes/users');
const listRoutes = require('./routes/lists');
const itemRoutes = require('./routes/items');

// Use routes
app.use('/users', userRoutes);
app.use('/lists', listRoutes);
app.use('/items', itemRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: "Grocery List API is running" });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});