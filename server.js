const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

//logger middleware
const logger = require('./middleware/logger');
app.use(logger);

// Import routes
const userRoutes = require('./routes/users');
const listRoutes = require('./routes/lists');
const itemRoutes = require('./routes/items');
const authRoutes = require('./routes/auth');

// Use routes
app.use('/users', userRoutes);
app.use('/lists', listRoutes);
app.use('/items', itemRoutes);
app.use('/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: "Grocery List API is running" });
});

//errorhandler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});