const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: "Grocery List API is running" });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});