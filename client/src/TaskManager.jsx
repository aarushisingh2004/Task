import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaThumbtack, FaSyncAlt } from 'react-icons/fa';
import './TaskManager.css';

const motivationQuotes = [
  "Keep pushing forward!",
  "Progress is progress, no matter how small.",
  "You're doing great—stay focused!",
  "Every step counts. Keep going!",
  "Your effort will pay off!"
];

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

  const handleAddOrUpdateTask = async () => {
    if (!task.title.trim()) return toast.warning('Please enter a task title');

    const isNew = !editingTaskId;
    const url = isNew ? API_URL : `${API_URL}/${editingTaskId}`;
    const method = isNew ? 'POST' : 'PUT';

    const requestBody = {
      ...task,
      id: isNew ? Date.now() : undefined,
      isDone: task.status === 'done'
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const data = await res.json();
      if (data.success) {
        toast.success(isNew ? 'Task added' : 'Task updated');

        // ✅ Show motivational quote if status is "in progress"
        if (task.status === 'in progress') {
          const randomQuote = motivationQuotes[Math.floor(Math.random() * motivationQuotes.length)];
          toast.info(randomQuote, { autoClose: 3000 });
        }

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
    const updatedStatus = task.status === 'todo' ? 'in progress'
                        : task.status === 'in progress' ? 'done'
                        : 'todo';

    try {
      const res = await fetch(`${API_URL}/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...task,
          isDone: updatedStatus === 'done',
          status: updatedStatus
        })
      });

      const data = await res.json();
      if (data.success) {
        // ✅ Show motivation toast if going to "in progress"
        if (updatedStatus === 'in progress') {
          const randomQuote = motivationQuotes[Math.floor(Math.random() * motivationQuotes.length)];
          toast.info(randomQuote, { autoClose: 3000 });
        }
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
        setPinnedIds(prev => {
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
          <button
            className="btn btn-secondary mt-3 w-100 d-flex justify-content-center align-items-center gap-2"
            onClick={handleRefreshCache}
            title="Refresh tasks cache from server"
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
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-column align-items-start">
                    <div className="d-flex align-items-center mb-1">
                      <input
                        type="checkbox"
                        className="form-check-input me-2"
                        checked={task.status === 'done'}
                        onChange={() => handleToggleDone(task)}
                      />
                      <strong style={{ textDecoration: task.status === 'done' ? 'line-through' : 'none' }}>
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
                    <button
                      className={`btn btn-sm btn-icon ${pinnedIds.includes(task._id) ? 'pinned' : ''}`}
                      onClick={() => togglePin(task._id)}
                      title="Pin"
                    >
                      <FaThumbtack />
                    </button>
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

      <footer className="app-footer text-center text-white py-3">
        &copy; {new Date().getFullYear()} Aarushi's Task Manager. All rights reserved.
      </footer>
    </div>
  );
};

export default TaskManager;
