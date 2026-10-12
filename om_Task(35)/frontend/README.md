# Workout Buddy - Frontend

React frontend for the Task 35 Workout Buddy CRUD application.

## Features

- Fetches workouts from the Express backend.
- Displays workouts as cards.
- Form fields for title, load and reps.
- Creates workouts with POST.
- Deletes workouts with DELETE.
- Uses React Context API + `useReducer` for global workout state.
- Updates the UI immediately after successful POST and DELETE.
- Displays server and validation errors.
- Responsive two-column desktop and stacked mobile layout.

## Setup

1. Install Node.js.
2. Run `npm install`.
3. Copy `.env.example` to `.env` if needed.
4. Make sure the backend is running on port 5000.
5. Run:

```text
npm start
```

The frontend runs through Vite, normally at `http://localhost:5173`.

The default API URL is:

`http://localhost:5000/api`
