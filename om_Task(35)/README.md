# Task 35 - Workout Buddy (MERN CRUD + Context)

## Project structure

```text
OmDendge_Task35/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   ├── server.js
│   └── README.md
└── frontend/
    ├── src/
    │   ├── context/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── style.css
    ├── .env.example
    ├── index.html
    ├── package.json
    └── README.md
```

## Backend requirements covered

- MongoDB Atlas connection using Mongoose.
- Workout schema:
  - `title` required
  - `load` required number
  - `reps` required number
  - timestamps
- REST APIs:
  - `GET /api/workouts`
  - `POST /api/workouts`
  - `DELETE /api/workouts/:id`
- Separate routes, controllers and models.
- Validation errors return status 400 with messages.
- Missing workout returns status 404.

## Frontend requirements covered

- React workout card list.
- Add workout form.
- Context API with `useReducer`.
- Global state handles:
  - loading workouts from backend
  - adding a workout after POST
  - removing a workout after DELETE
- Dynamic UI updates.
- Frontend displays errors in the UI.

## Run the full project

### 1. Backend

Open a terminal:

```text
cd backend
npm install
```

Copy `.env.example` to `.env` and set your MongoDB Atlas connection string:

```text
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
CLIENT_URL=http://localhost:5173
```

Then:

```text
npm start
```

### 2. Frontend

Open a second terminal:

```text
cd frontend
npm install
npm start
```

Open the Vite address shown in the terminal.

## MongoDB Atlas

Create a database user and allow your development IP in Atlas network access. Use the generated connection string as the value of `MONGO_URI`.

No `node_modules` folders are included in this submission.
