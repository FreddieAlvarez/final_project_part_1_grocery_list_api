const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

// Middleware
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
app.use(logger);

// Routes
const userRoutes = require('./routes/users');
const listRoutes = require('./routes/lists');
const itemRoutes = require('./routes/items');
const authRoutes = require('./routes/auth');

app.use('/users', userRoutes);
app.use('/lists', listRoutes);
app.use('/items', itemRoutes);
app.use('/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: "Grocery List API is running" });
});

// Error handler
app.use(errorHandler);

module.exports = app;