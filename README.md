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
root/
├── client/ # React Frontend (Vite)
│ ├── src/
│ │ └── TaskManager.jsx
│ │ └── TaskManager.css
│ └── index.html
├── server/ # Node.js + Express Backend
│ ├── Models/
│ │ └── TaskModel.js
│ ├── Routes/
│ │ └── TaskRoutes.js
│ └── Controllers/
│ └── TaskController.js
├── Dockerfile
├── docker-compose.yml


🔍 How It Works
- On visiting the app, the user is greeted with a clean task dashboard.
- Tasks can be created using the form. Each task can have a title, description, and status.
- Users can:
  - Toggle task completion (checkbox)
  - Search across all tasks
  - Edit or delete tasks
- The backend APIs handle all operations securely and persist data in MongoDB.
- The app provides feedback via toasts and animations for smoother UX.
🚀 Getting Started Locally
### Prerequisites
- Docker & Docker Compose installed
### Steps

# Clone the repo
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app

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
