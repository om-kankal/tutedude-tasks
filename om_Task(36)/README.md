# Task 36 - Authentication with JWT

This submission contains both the Express.js backend and React frontend.

## Folder structure

```text
OmDendge_Task36/
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── .env.example
│   ├── package.json
│   ├── server.js
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── style.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── README.md
└── README.md
```

## Backend

Routes:

- `POST /api/register`
- `POST /api/login`
- `GET /api/protected`

JWT middleware checks the `Authorization: Bearer <token>` header.

For this classroom task, registered users are stored in an in-memory array as requested by the assignment. In a real project, credentials should be hashed and stored in a database.

## Frontend

The React app provides registration and login forms, saves the JWT in `localStorage`, and uses that JWT when requesting `/api/protected`.

## Run backend

```text
cd backend
npm install
```

Copy `.env.example` to `.env` and set a secret:

```text
PORT=5000
JWT_SECRET=your_long_secret_here
CLIENT_URL=http://localhost:5173
```

Then:

```text
npm start
```

## Run frontend

Open another terminal:

```text
cd frontend
npm install
npm start
```

Open the Vite URL in the browser.

## Test flow

Register -> Login -> Access Protected Route -> Logout.

No `node_modules` directories are included in the ZIP.
