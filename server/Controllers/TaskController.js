const TaskModel = require('../Models/TaskModel');

// ✅ Create a new task
const createTask = async (req, res) => {
  try {
    const data = req.body;

    // Optional: Validate required fields manually if needed
    if (!data.title || data.id === undefined) {
      return res.status(400).json({
        message: 'Title and ID are required',
        success: false,
      });
    }

    const model = new TaskModel(data);
    await model.save();

    res.status(201).json({
      message: 'Task is created',
      success: true,
      task: model,
    });
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({
      message: 'Failed to create task',
      success: false,
      error: err.message,
    });
  }
};

// ✅ Fetch all tasks
const fetchAllTasks = async (req, res) => {
  try {
    const data = await TaskModel.find();
    res.status(200).json({
      message: 'All Tasks',
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to get all tasks',
      success: false,
      error: err.message,
    });
  }
};

// ✅ Update task by ID
const updateTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const updatedTask = await TaskModel.findByIdAndUpdate(id, { $set: body }, { new: true });

    if (!updatedTask) {
      return res.status(404).json({
        message: 'Task not found',
        success: false,
      });
    }

    res.status(200).json({
      message: 'Task updated',
      success: true,
      task: updatedTask,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to update task',
      success: false,
      error: err.message,
    });
  }
};

// ✅ Delete task by ID
const deleteTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTask = await TaskModel.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        message: 'Task not found',
        success: false,
      });
    }

    res.status(200).json({
      message: 'Task deleted',
      success: true,
      task: deletedTask,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to delete task',
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  createTask,
  fetchAllTasks,
  updateTaskById,
  deleteTaskById,
};
