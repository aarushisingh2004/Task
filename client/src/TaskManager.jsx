import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaThumbtack, FaSyncAlt } from 'react-icons/fa';
import './TaskManager.css';

const TaskManager = () => {
  const [task, setTask] = useState({ title: '', description: '', status: 'todo' });
  const [searchTerm, setSearchTerm] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [pinnedIds, setPinnedIds] = useState(() => JSON.parse(localStorage.getItem('pinned')) || []);
  const API_URL = `${import.meta.env.VITE_API_URL}`;

  useEffect(() => {
    loadTasksWithCache();
  }, []);

  const loadTasksWithCache = async () => {
    const cachedTasks = localStorage.getItem('tasks');
    if (cachedTasks) {
      setTasks(JSON.parse(cachedTasks));
    } else {
      await fetchTasksAndCache();
    }
  };

  const fetchTasksAndCache = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (data.success) {
        setTasks(data.data);
        localStorage.setItem('tasks', JSON.stringify(data.data));
      }
    } catch {
      toast.error('Failed to fetch tasks');
    }
  };

  const motivationalQuotes = [
    "Keep pushing forward!",
    "You're doing amazing!",
    "Stay focused, stay strong.",
    "Believe in yourself!",
    "Progress is power 💪",
  ];

  const handleAddOrUpdateTask = async () => {
    if (!task.title.trim()) return toast.warning('Please enter a task title');

    const now = new Date().toISOString();

    const newTask = {
      ...task,
      id: editingTaskId ? undefined : Date.now(),
      isDone: false,
      updatedAt: now,
      createdAt: editingTaskId ? undefined : now
    };

    const requestOptions = {
      method: editingTaskId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    };

    const url = editingTaskId ? `${API_URL}/${editingTaskId}` : API_URL;

    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();
      if (data.success) {
        toast.success(editingTaskId ? 'Task updated' : 'Task added');
        setTask({ title: '', description: '', status: 'todo' });
        setEditingTaskId(null);
        fetchTasksAndCache();
      } else {
        toast.error(data.message);
      }
    } catch {
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
          status: !task.isDone ? 'done' : 'todo',
          updatedAt: new Date().toISOString()
        })
      });
      const data = await res.json();
      if (data.success) {
        fetchTasksAndCache();
      } else toast.error(data.message);
    } catch {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const res = await fetch(`${API_URL}/${taskId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('Task deleted');
        setPinnedIds((prev) => {
          const updated = prev.filter(id => id !== taskId);
          localStorage.setItem('pinned', JSON.stringify(updated));
          return updated;
        });
        if (editingTaskId === taskId) {
          setEditingTaskId(null);
          setTask({ title: '', description: '', status: 'todo' });
        }
        fetchTasksAndCache();
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error('Failed to delete task');
    }
  };

  const handleEditTask = (task) => {
    setTask({ title: task.title, description: task.description, status: task.status });
    setEditingTaskId(task._id);
  };

  const togglePin = (taskId) => {
    let updatedPins;
    if (pinnedIds.includes(taskId)) {
      updatedPins = pinnedIds.filter(id => id !== taskId);
    } else {
      updatedPins = [...pinnedIds, taskId];
    }
    setPinnedIds(updatedPins);
    localStorage.setItem('pinned', JSON.stringify(updatedPins));
  };

  const handleRefreshCache = () => {
    localStorage.removeItem('tasks');
    fetchTasksAndCache();
    toast.info('Cache refreshed');
  };

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setTask(prev => ({ ...prev, status: selectedStatus }));
    if (selectedStatus === 'in progress') {
      const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      toast.info(randomQuote);
    }
  };

  const filteredTasks = tasks
    .filter(t =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aPinned = pinnedIds.includes(a._id);
      const bPinned = pinnedIds.includes(b._id);
      return bPinned - aPinned;
    });

  const cachedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in progress').length;
  const todoTasks = tasks.filter(t => t.status === 'todo').length;

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
            onChange={handleStatusChange}
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
          <button
            className="btn btn-secondary mt-3 w-100 d-flex justify-content-center align-items-center gap-2"
            onClick={handleRefreshCache}
          >
            <FaSyncAlt /> Refresh Cache
          </button>
        </div>

        <div className="stats-container mt-4 w-100">
          <div className="stat-box bg-primary text-white p-3 rounded text-center">
            <h5>Total Tasks</h5>
            <p className="fs-4">{tasks.length}</p>
          </div>
          <div className="stat-box bg-info text-dark p-3 rounded text-center">
            <h5>Cached Tasks</h5>
            <p className="fs-4">{cachedTasks.length}</p>
          </div>
          <div className="stat-box bg-success text-white p-3 rounded text-center">
            <h5>Completed</h5>
            <p className="fs-4">{completedTasks}</p>
          </div>
          <div className="stat-box bg-warning text-dark p-3 rounded text-center">
            <h5>In Progress</h5>
            <p className="fs-4">{inProgressTasks}</p>
          </div>
          <div className="stat-box bg-secondary text-white p-3 rounded text-center">
            <h5>To Do</h5>
            <p className="fs-4">{todoTasks}</p>
          </div>
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
                <div className="task-info-container">
                  <div className="task-left">
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
                    <small>{task.description}</small>
                  </div>
                  <div className="task-meta">
                    <div className={`badge mb-1 ${task.status === 'done'
                      ? 'bg-success'
                      : task.status === 'in progress'
                        ? 'bg-warning text-dark'
                        : 'bg-secondary'}`}>
                      {task.status}
                    </div>
                    <div>Created: {new Date(task.createdAt).toLocaleString()}</div>
                    <div>Updated: {new Date(task.updatedAt).toLocaleString()}</div>
                    <div className="d-flex justify-content-end gap-2 mt-2">
                      <button className={`btn btn-sm btn-icon ${pinnedIds.includes(task._id) ? 'pinned' : ''}`} onClick={() => togglePin(task._id)}><FaThumbtack /></button>
                      <button className="btn btn-sm btn-icon edit-icon" onClick={() => handleEditTask(task)}><FaEdit /></button>
                      <button className="btn btn-sm btn-icon delete-icon" onClick={() => handleDeleteTask(task._id)}><FaTrash /></button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer className="app-footer text-center text-white py-3">
        &copy; {new Date().getFullYear()} Aarushi's Task Manager. All rights reserved.
      </footer>
    </div>
  );
};

export default TaskManager;
