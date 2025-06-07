const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ['todo', 'in progress', 'done'],
    default: 'todo'
  },
  isDone: {                   // ✅ Newly added field
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const TaskModel = mongoose.model('Task', TaskSchema, 'todos');

module.exports = TaskModel;
