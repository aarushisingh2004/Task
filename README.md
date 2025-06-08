# 🗂️ Task Manager Web Application

An intuitive and responsive **Task Management System** built with the **MERN Stack** (MongoDB, Express.js, React, Node.js) and **Dockerized** for seamless deployment.

This full-stack web app allows users to create, manage, and track their tasks efficiently, with a modern UI, real-time feedback, and persistent storage.

---

## 🔗 Live Demo & Walkthrough

- 🌐 **Deployed Site**: [https://your-deployment-url.com](https://your-deployment-url.com)
- 🎥 **YouTube Demo Video**: [https://youtube.com/your-demo-video](https://youtube.com/your-demo-video)

---

## 📌 Features

- ✅ Add, edit, delete tasks
- ✅ Set task status: *To Do*, *In Progress*, or *Done*
- ✅ Mark tasks as complete with a checkbox
- ✅ **Instant search** by title or description
- ✅ **Animated UI** with interactive icons and feedback
- ✅ Fully **responsive** and mobile-friendly
- ✅ **Toast notifications** for all operations
- ✅ **Dockerized frontend and backend** for smooth deployment

---

## 🛠️ Tech Stack

### ⚙️ Frontend
- ⚛️ React (with Vite)
- 🎨 React Icons
- 📢 React Toastify
- 🧩 Bootstrap + Custom CSS

### 🧠 Backend
- 🔗 Node.js + Express
- 🗄️ MongoDB (via Mongoose)

### 🐳 DevOps
- 🐳 Docker: Separate containers for client and server
- 🔍 Postman: API testing
- 🛠️ GitHub: Version control

---

## 📂 Folder Structure

```
root/
├── client/ # React Frontend (Vite)
│   ├── src/
│   │   ├── TaskManager.jsx
│   │   └── TaskManager.css
│   └── index.html
├── server/ # Node.js + Express Backend
│   ├── Models/
│   │   └── TaskModel.js
│   ├── Routes/
│   │   └── TaskRoutes.js
│   └── Controllers/
│       └── TaskController.js
├── Dockerfile
└── docker-compose.yml
```



🔍 **How It Works**

- On visiting the app, the user is greeted with a clean and responsive task dashboard.
- Tasks can be created using the form. Each task consists of:
  - Title (required)
  - Description (optional)
  - Status (To Do, In Progress, Done)
- Users can:
  - Add new tasks or update existing ones.
  - Toggle task completion status via checkboxes, which updates the status and shows a line-through effect on completed tasks.
  - Search tasks by title or description using a live search bar.
  - Edit or delete tasks with dedicated buttons.
  - Pin/unpin tasks to prioritize them; pinned tasks always appear at the top and this pin state is saved in `localStorage` for persistence.
  - Refresh the task cache manually to fetch fresh data from the server and clear stale cached tasks.
- Tasks and pinned task IDs are cached locally in the browser using `localStorage` to improve performance and reduce unnecessary server requests.
- All CRUD operations (Create, Read, Update, Delete) are managed via RESTful backend APIs built with Node.js and Express, persisting data in MongoDB.
- The UI provides instant feedback through animated transitions and toast notifications for actions like task addition, update, deletion, and cache refresh.
- Error handling is implemented with user-friendly toast alerts in case of server or network failures.

# How Task2 was implemented

## Caching Implementation for Tasks

This Task Manager app uses **localStorage caching** to improve performance by reducing unnecessary API calls and enabling faster data load.

### How Caching Works

- On app start, the app checks if tasks are cached in `localStorage` under the key `tasks`.
  - If cached data exists, it loads tasks directly from localStorage to display immediately.
  - If not, it fetches tasks from the backend API and caches the result in localStorage for future use.
  
- Whenever a task is added, updated, or deleted, the app fetches fresh tasks from the backend and updates both the UI and the local cache.

- A **Refresh Cache** button allows the user to manually clear cached data and reload fresh tasks from the server.

### Benefits

- **Faster loading:** Users see tasks instantly from local cache without waiting for network response.
- **Reduced API calls:** Limits unnecessary requests to the backend.
- **Data synchronization:** Keeps local cache updated after each change.
- **User control:** Manual cache refresh option.

### Technical Details

- Tasks are stored in localStorage as JSON string under the key `tasks`.
- Pinned task IDs are stored separately in localStorage under the key `pinned`.
- React state hooks (`useState`) manage the cached data in the app.
- Key functions:
  - `loadTasksWithCache()`: Loads tasks from cache or API.
  - `fetchTasksAndCache()`: Fetches fresh tasks and updates cache.
- Includes error handling and user notifications for fetch failures.




### Prerequisites
- Docker & Docker Compose installed
### Steps

# Clone the repo
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app

## 🚀 Getting Started Locally

Follow these steps to run the Task Manager app on your local machine:

### 🧰 Prerequisites

- **Node.js** (v14 or above)
- **npm** (comes with Node.js)
- **MongoDB** (locally or via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

---

### 📁 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```




# Start containers
docker-compose up --build

🌐 Visit the app at: http://localhost:5173
🔌 API runs at: http://localhost:8080
📦 API Overview

| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| GET    | /tasks              | Get all tasks        |
| POST   | /tasks              | Add new task         |
| PUT    | /tasks/:id          | Update a task        |
| DELETE | /tasks/:id          | Delete a task        |

🙋‍♀️ About Me

Hi! I'm Aarushi, a passionate full-stack developer and tech enthusiast.
🔹 I'm currently a 3rd-year ECE with Artificial Intelligence student at IGDTUW
🔹 Reliance Foundation Scholar | Python instructor at Cybeorg
🔹 I love building real-world apps with a clean UI and solid backend

📬 Connect on LinkedIn: https://linkedin.com/in/your-profile

⭐ Feedback & Contributions
If you like this project, consider giving it a ⭐. For suggestions or collaborations, feel free to raise an issue or PR!
