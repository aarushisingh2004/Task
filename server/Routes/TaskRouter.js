const express = require('express');
const router = express.Router();
const {
  createTask,
  fetchAllTasks,
  updateTaskById,
  deleteTaskById
} = require('../Controllers/TaskController');

// ✅ Fetch all tasks
router.get('/', fetchAllTasks);

// ✅ Create a new task
router.post('/', createTask);

// ✅ Update a task by ID
router.put('/:id', updateTaskById);

// ✅ Delete a task by ID
router.delete('/:id', deleteTaskById);

module.exports = router;
