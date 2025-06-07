import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import './TaskManager.css';

const TaskManager = () => {
  const [task, setTask] = useState({ title: '', description: '', status: 'todo' });
  const [searchTerm, setSearchTerm] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const API_URL = 'http://localhost:8080/tasks';

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (data.success) {
        setTasks(data.data);
      }
    } catch (err) {
      toast.error('Failed to fetch tasks');
    }
  };

  const handleAddOrUpdateTask = async () => {
    if (!task.title.trim()) return toast.warning('Please enter a task title');

    const requestOptions = {
      method: editingTaskId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...task,
        id: editingTaskId ? undefined : Date.now(),
        isDone: false
      })
    };

    const url = editingTaskId ? `${API_URL}/${editingTaskId}` : API_URL;

    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();
      if (data.success) {
        toast.success(editingTaskId ? 'Task updated' : 'Task added');
        setTask({ title: '', description: '', status: 'todo' });
        setEditingTaskId(null);
        fetchTasks();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('Error saving task');
    }
  };

  const handleToggleDone = async (task) => {
    try {
      const res = await fetch(`${API_URL}/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...task,
          isDone: !task.isDone,
          status: !task.isDone ? 'done' : 'todo'
        })
      });
      const data = await res.json();
      if (data.success) {
        fetchTasks();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const res = await fetch(`${API_URL}/${taskId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Task deleted');
        fetchTasks();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  const handleEditTask = (task) => {
    setTask({ title: task.title, description: task.description, status: task.status });
    setEditingTaskId(task._id);
  };

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="task-manager-bg py-4">
      <div className="d-flex flex-column align-items-center w-50 m-auto animate-fade-in">
        <h1 className="text-white mb-4">Task Manager</h1>

        <div className="custom-card p-4 w-100">
          <input
            type="text"
            placeholder="Enter task title..."
            className="form-control mb-2"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Enter task description..."
            className="form-control mb-2"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
          <select
            className="form-select mb-3"
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
          >
            <option value="todo">To Do</option>
            <option value="in progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button
            className="btn btn-success w-100 d-flex justify-content-center align-items-center gap-2"
            onClick={handleAddOrUpdateTask}
          >
            <FaPlus /> {editingTaskId ? 'Update Task' : 'Add Task'}
          </button>
        </div>

        <div className="input-group my-4 w-100 animate-slide-in">
          <span className="input-group-text search-icon"><FaSearch /></span>
          <input
            type="text"
            placeholder="Search tasks..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <ToastContainer />

      <div className="mt-4 text-center">
        {filteredTasks.length === 0 ? (
          <p className="text-white">No tasks found.</p>
        ) : (
          <ul className="w-75 m-auto">
            {filteredTasks.map(task => (
              <li key={task._id} className="custom-list animate-fade-in">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-column align-items-start">
                    <div className="d-flex align-items-center mb-1">
                      <input
                        type="checkbox"
                        className="form-check-input me-2"
                        checked={task.isDone}
                        onChange={() => handleToggleDone(task)}
                      />
                      <strong style={{ textDecoration: task.isDone ? 'line-through' : 'none' }}>
                        {task.title}
                      </strong>
                    </div>
                    <small className="text-light">{task.description}</small>
                  </div>
                  <div className="text-end d-flex align-items-center gap-2">
                    <span className={`badge ${task.status === 'done'
                      ? 'bg-success'
                      : task.status === 'in progress'
                        ? 'bg-warning text-dark'
                        : 'bg-secondary'}`}>
                      {task.status}
                    </span>
                    <button className="btn btn-sm btn-icon edit-icon" onClick={() => handleEditTask(task)}>
                      <FaEdit />
                    </button>
                    <button className="btn btn-sm btn-icon delete-icon" onClick={() => handleDeleteTask(task._id)}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
