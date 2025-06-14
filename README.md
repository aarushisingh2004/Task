# 🗂️ Task Manager Web Application

## 🔗 Live Demo & Walkthrough

- 🌐 **Deployed Site**: [https://task-qpop.vercel.app](https://task-qpop.vercel.app)
- 🎥 **YouTube Demo Video**: [https://youtu.be/2f9vHzY3rHg](https://youtu.be/2f9vHzY3rHg)

An intuitive and responsive **Task Management System** built with the **MERN Stack** (MongoDB, Express.js, React, Node.js) and **Dockerized** for seamless deployment.

This full-stack web app allows users to create, manage, and track their tasks efficiently, with a modern UI, real-time feedback, and persistent storage.

## 🧠 Approach & Architecture

- **Frontend:** Developed using React with Vite for fast bundling and Bootstrap for responsive UI. Toast notifications are integrated using `react-toastify`.
- **Backend:** Built using Express.js and MongoDB, with Mongoose for schema modeling and API endpoints for CRUD operations.
- **Data Flow:** React fetches task data from the API and stores it in local state. Backend handles storage in MongoDB. UI updates are instantaneous with real-time feedback.
- **Deployment:** Frontend hosted using Vercel, backend on Render.

---

## ⚙️ Design Decisions

| Area                | Decision Made                                                                 |
|---------------------|-------------------------------------------------------------------------------|
| **Stack**           | Chose MERN stack for its wide support, flexibility, and real-time capabilities |
| **Styling**         | Used Bootstrap to ensure responsive layout and rapid development              |
| **State Handling**  | Used `useState` and `useEffect` for simplicity and performance                |
| **Toast Feedback**  | Selected `react-toastify` for its ease of use and customization               |
| **Database**        | MongoDB chosen for document-oriented storage, fast integration with Mongoose  |
| **Hosting**         | Render (backend) + Vercel (frontend) for quick, free, and scalable deployment |


---

## 🛡️ Error Handling Strategy

Network errors, API failures, and unexpected input scenarios are handled gracefully to enhance user experience and maintain app stability.

### ✅ How It Works

- **Try-Catch Blocks:** All API calls are wrapped in `try...catch` to prevent crashes due to server or network issues.
- **Toast Notifications:** `react-toastify` displays clear and user-friendly error messages  
  _Example: "Failed to fetch tasks. Please try again."_
- **Loading & Disabled States:** Buttons and input fields are temporarily disabled during API calls to prevent duplicate submissions.
- **Fallback UI:** If data fetch fails (e.g., due to server downtime), fallback messages are shown instead of broken UI elements.

### 🧪 Example (React)

```js
const fetchTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/tasks`);
    if (!response.ok) {
      throw new Error('Server error');
    }
    const data = await response.json();
    setTasks(data);
  } catch (error) {
    toast.error("Failed to fetch tasks. Please check your connection.");
  }
};
```

![image](https://github.com/user-attachments/assets/87e44147-f58a-49fd-b33c-d858003b4abd)





---

## 📌 Features

![image](https://github.com/user-attachments/assets/a92a3b0f-742f-492a-ac67-fa4c9b4e2e3f)


- ✅ Add, edit, delete tasks
- ✅Pin the important tasks
- ✅ Set task status: *To Do*, *In Progress*, or *Done*
- ✅ Mark tasks as complete with a checkbox
- ✅ **Instant search** by title or description
- ✅ **Animated UI** with interactive icons and feedback
- ✅ You get Motivating quotes if your task is in progress
- ✅ Fully **responsive** and mobile-friendly
  
  
## Mobile view
<img src="https://github.com/user-attachments/assets/ed680992-cc3f-4ec7-89bb-2ff77f50d97f" width="300"/>



- ✅ **Toast notifications** for all operations
- ✅ **Dockerized frontend and backend** for smooth deployment
  

---

![image](https://github.com/user-attachments/assets/3970d14c-7215-4be0-99a5-e7d3b2dc954e)


## 🛠️ Tech Stack

### ⚙️ Frontend
- ⚛️ React (with Vite)
- 🎨 React Icons
- 📢 React Toastify
- 🧩 Bootstrap + Custom CSS

### 🧠 Backend
- 🔗 Node.js + Express
- 🗄️ MongoDB (via Mongoose)
  ## records can be seen in the db
  ![image](https://github.com/user-attachments/assets/05dcfc70-2a97-4bbd-82a9-f78b2c0aadc4)


### 🐳 DevOps
- 🐳 Docker: Separate containers for client and server
- 🔍 Postman: API testing
- 🛠️ GitHub: Version control
  ## Testing of Put method in postman
  ![image](https://github.com/user-attachments/assets/0ca2a3bd-c764-4184-a915-33d85f8de814)


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
    ![image](https://github.com/user-attachments/assets/4fa84797-702d-4e80-babe-cc08f134729a)

    
- Users can:
  - Add new tasks or update existing ones.
  - Toggle task completion status via checkboxes, which updates the status and shows a line-through effect on completed tasks.
  - Search tasks by title or description using a live search bar.
  - Edit or delete tasks with dedicated buttons.
  - Pin/unpin tasks to prioritize them; pinned tasks always appear at the top and this pin state is saved in `localStorage` for persistence.
  - Refresh the task cache manually to fetch fresh data from the server and clear stale cached tasks.
  - Date of addition and updation of task is also visible.
  - User can easily view the number of task, the status wise count of task, how many are completed and how many are still to be done or in progress.
- Tasks and pinned task IDs are cached locally in the browser using `localStorage` to improve performance and reduce unnecessary server requests.

  ## pinned task
![image](https://github.com/user-attachments/assets/db24d3f0-8272-4e60-a217-a2c8f9dbc06f)


  
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

  ## Cached Data visible in the local storage
  ![image](https://github.com/user-attachments/assets/20c94fc5-f798-4fbb-8995-4c72c5fd7767)


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

  ![image](https://github.com/user-attachments/assets/2a891422-0208-48b2-a83d-59eae3442988)





# Task 3: Vector Search for Similar Tasks (MongoDB)

![image](https://github.com/user-attachments/assets/f70133fe-33b8-4c29-ad8e-d37fa48495c2)

#### Got right results on searching


## 🧠 Vector Search Feature

- ✅ Integrated semantic search using `sentence-transformers` and MongoDB vector indexing.
- 🧠 Generated task description embeddings using a Python microservice (`MiniLM` model).
- 💾 Stored vectors in MongoDB and created a vector index using `$vectorSearch`.
- 🔍 Built a `/vector-search` route to return tasks with similar meanings.
- 🔎 Added a search bar in the frontend to find related tasks (e.g., **"study React"** ↔ **"revise JS"**).


## Feature Overview:
Implemented semantic search in the Task Manager using vector embeddings. This allows users to find tasks with similar meanings — not just keyword matches. For example, searching "buy groceries" can return tasks like "get milk" or "purchase eggs".

## What is Vector Search?
Vector search uses machine learning embeddings to represent text as numerical vectors. By comparing these vectors (e.g., using cosine similarity), we can identify tasks with similar content even if the words are different.

## MongoDB Schema Changes
Each task document in MongoDB now includes:

```json
{
  "title": "Buy groceries",
  "description": "Get milk, eggs, and bread",
  "embedding": [0.12, -0.34, ..., 0.56]  // 384-dimensional vector
}
```
`embedding`: A list of floats generated from the task's description using the Sentence Transformers model.

## How Embeddings Are Generated
We use the `all-MiniLM-L6-v2` model from Sentence Transformers to generate vector embeddings.

### Python Example:
```python
from sentence_transformers import SentenceTransformer
import pymongo

model = SentenceTransformer('all-MiniLM-L6-v2')
desc = "Get milk, eggs, and bread"
embedding = model.encode(desc).tolist()

task = {
    "title": "Buy groceries",
    "description": desc,
    "embedding": embedding
}

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["taskDB"]
db.tasks.insert_one(task)
```

## How Vector Search Works
When a user enters a search query:

1. Convert the query into a vector embedding.
2. Fetch all tasks and their embeddings from MongoDB.
3. Use cosine similarity to compare the query vector with each task's vector.
4. Return the top 3 most similar tasks.

### Python Search Example:
```python
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

query = "shopping"
query_embedding = model.encode(query).reshape(1, -1)

tasks = list(db.tasks.find({}))
task_embeddings = [task["embedding"] for task in tasks]
titles = [task["title"] for task in tasks]

similarities = cosine_similarity(query_embedding, task_embeddings)[0]
top_indices = np.argsort(similarities)[-3:][::-1]

for idx in top_indices:
    print(f"Task: {titles[idx]}, Similarity: {similarities[idx]:.2f}")
```

## Key Outcomes
* Semantic vector embeddings stored in MongoDB.
* Vector-based similarity search implemented using cosine similarity.
* Returns top 3 related tasks based on meaning.
* Improves UX with smarter task discovery.


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

  ## Dependencies
  Markdown

# 📁 README.md — Dependencies Section

## 🧩 Dependencies

### 📦 Backend (Node.js + Express + MongoDB)

To install backend dependencies:

```bash
cd server
npm install
```
## 🧰 Backend Dependencies

| Package        | Purpose                                                                 |
|----------------|-------------------------------------------------------------------------|
| `express`      | Web framework for building the REST API                                 |
| `mongoose`     | ODM (Object Data Modeling) library for MongoDB, used for schema modeling |
| `cors`         | Enables Cross-Origin Resource Sharing to allow frontend-backend communication |
| `dotenv`       | Loads environment variables from a `.env` file                          |
| `body-parser`  | Parses incoming request bodies in middleware                            |
| `nodemon` (dev)| Automatically restarts the server on file changes during development    |

```
npm install express mongoose cors dotenv body-parser
npm install --save-dev nodemon
```
## 🌐 Frontend (React + Vite)
To install frontend dependencies:

```
cd client
npm install
```

## 🎨 Frontend Dependencies

| Package          | Purpose                                                                 |
|------------------|-------------------------------------------------------------------------|
| `react`          | Core React library                                                      |
| `react-dom`      | DOM-specific methods for React                                          |
| `react-icons`    | Icon library for popular icon sets (used for buttons like edit/delete)  |
| `react-toastify` | Notification/toast system for feedback messages                         |
| `bootstrap`      | Responsive design and styling framework                                 |
| `vite`           | Fast frontend tooling to bundle and serve React apps                    |

```
npm install react react-dom react-icons react-toastify bootstrap
```

⚙️ If Vite is not already set up, initialize with:
```
npm create vite@latest client -- --template react
```

---

### 📁 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 🖥️ 2. Start the Backend Server

```
cd server
npm install
npm start

```
#### Make sure mongoDb is running before this.

### Start the Frontend (React) Client
Open a new terminal:

```
cd client
npm install
npm run dev
```



This will start the frontend on http://localhost:5173





# Start containers

If you want to run the full stack app with Docker:
```
docker-compose up --build
```

## 🧪 Test the App

- Visit [http://localhost:5173](http://localhost:5173) in your browser.
- Create, update, delete, and pin tasks.
- Use the **Refresh Cache** button to clear local cache and fetch fresh data.


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

📬 Connect on LinkedIn: https://www.linkedin.com/in/aarushi-singh-b00553253/

⭐ Feedback & Contributions
If you like this project, consider giving it a ⭐. For suggestions or collaborations, feel free to raise an issue or PR!
