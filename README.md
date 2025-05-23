# 🦎 Reptile Management Full-Stack App

This project is a simple full-stack application that lets users view, create, update, and delete reptiles via a frontend React interface and a backend Express API using a local JSON file for data storage.

---

## 🗂 Project Structure

```

root/
│
├── backend/               # Express API server
│   ├── server.js          # Main server logic
│   └── reptiles.json      # Local data storage
│
└── frontend/              # React app with Tailwind CSS
└── src/App.jsx        # Main app component

```

---

## 🚀 Getting Started

### 1. Repository

This is a template repository – feel free to clone it or use it as a template for your own project:

🔗 https://github.com/Zsombinszky/reptiles

---

### 2. Install dependencies

#### 🔙 Backend

Navigate into the `backend` directory and install dependencies:

```bash
cd backend
npm install
```

#### 🎨 Frontend

Then install frontend dependencies:

```bash
cd ../frontend
npm install
```

---

### 3. Run the project

#### 🔙 Start Backend

Start the Express server:

```bash
cd backend
npm run dev
```

> The backend will run on: `http://localhost:3001`

#### 🎨 Start Frontend

In a separate terminal, run the frontend:

```bash
cd frontend
npm run dev
```

> The frontend will usually run on: `http://localhost:5173`

---

## 🧪 API Endpoints

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| GET    | `/api/reptiles`     | Fetch all reptiles   |
| GET    | `/api/reptiles/:id` | Fetch reptile by ID  |
| POST   | `/api/reptiles`     | Create a new reptile |
| PUT    | `/api/reptiles/:id` | Update reptile by ID |
| DELETE | `/api/reptiles/:id` | Delete reptile by ID |

---

## 📝 Notes

- Reptile data is stored in a `reptiles.json` file located in the `backend` folder.
- If you edit the `reptiles.json` manually, restart the server to apply changes.
- Tailwind CSS is used for styling the frontend.
- The backend uses `express.json()` to handle incoming JSON request bodies.

---

## 📦 Scripts

### Backend

```bash
npm run dev       # Start the Express server
```

### Frontend

```bash
npm run dev       # Start the React dev server
```

---
