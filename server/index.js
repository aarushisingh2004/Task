const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// ✅ If you're in Task/server, use ./Models/db.js
require('./Models/db');

// ✅ Adjust path to match correct file structure
const TaskRouter = require('./Routes/TaskRouter');

const PORT = process.env.PORT || 8080;

// ✅ Middlewares
app.use(cors());
app.use(express.json()); // To parse incoming JSON

// ✅ Default route
app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

// ✅ Task routes
app.use('/tasks', TaskRouter);

// ✅ Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
