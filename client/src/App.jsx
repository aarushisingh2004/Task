import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import './TaskManager.css'; // custom styling and animations

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
      if (data.success) setTasks(data.data);
    } catch {
      toast.error('Failed to fetch tasks');
    }
  };

  const handleAddOrUpdateTask = async () => {
    if (!task.title.trim()) return toast.warning('Enter a task title');

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
          status: !task.isDone ? 'done' : 'todo'
        })
      });
      const data = await res.json();
      if (data.success) fetchTasks();
      else toast.error(data.message);
    } catch {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('Task deleted');
        fetchTasks();
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

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="task-manager-bg py-5">
      <div className="container py-4 animate-fade-in">
        <div className="text-center mb-4">
          <h1 className="fw-bold text-light">📝 My Task Manager</h1>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg custom-card">
              <div className="card-body">
                <input
                  type="text"
                  placeholder="Title"
                  className="form-control mb-2"
                  value={task.title}
                  onChange={(e) => setTask({ ...task, title: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Description"
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
                  className={`btn w-100 ${editingTaskId ? 'btn-success' : 'btn-info'} fw-bold`}
                  onClick={handleAddOrUpdateTask}
                >
                  <FaPlus className="me-2" />
                  {editingTaskId ? 'Update Task' : 'Add Task'}
                </button>
              </div>
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              className="form-control mt-3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <ToastContainer />

        <div className="row justify-content-center mt-4">
          <div className="col-md-8">
            {filteredTasks.length === 0 ? (
              <p className="text-center text-light">No tasks found.</p>
            ) : (
              <ul className="list-group shadow-lg animate-slide-in">
                {filteredTasks.map((task) => (
                  <li
                    key={task._id}
                    className="list-group-item d-flex justify-content-between align-items-start custom-list"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold d-flex align-items-center">
                        <input
                          type="checkbox"
                          className="form-check-input me-2"
                          checked={task.isDone}
                          onChange={() => handleToggleDone(task)}
                        />
                        <span style={{ textDecoration: task.isDone ? 'line-through' : 'none' }}>
                          {task.title}
                        </span>
                      </div>
                      <small className="text-muted">{task.description}</small>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className={`badge bg-${
                        task.status === 'done' ? 'success' : task.status === 'in progress' ? 'warning' : 'secondary'
                      } me-2`}>
                        {task.status}
                      </span>
                      <button className="btn btn-sm btn-outline-light me-2" onClick={() => handleEditTask(task)}>
                        <FaEdit />
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteTask(task._id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
