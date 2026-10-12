# Task 33 - MongoDB To-Do List + React Integration

This submission contains both parts of the assignment.

## Part 1 - Backend
`server/` contains a Node.js + Express.js API connected to MongoDB through Mongoose.

API:
- POST `/api/tasks`
- GET `/api/tasks`
- GET `/api/tasks/:id`
- PUT `/api/tasks/:id`
- DELETE `/api/tasks/:id`

## Part 2 - React integration
`client/` contains a React/Vite frontend that uses the API with `fetch()`.

The UI supports:
- Add a task
- Read task list
- Update/complete task
- Delete task
- Filter tasks
- Error handling and loading state

## Running the project

### Terminal 1 - Backend
```text
cd server
npm install
copy .env.example .env
```

Set `MONGODB_URI` in `.env`, then:

```text
npm start
```

### Terminal 2 - Frontend
```text
cd client
npm install
npm start
```

Open the Vite URL shown in the terminal.

## Database
Use a local MongoDB installation or MongoDB Atlas. The database name used in the example connection is `todolist`.

## Environment variables

### server/.env
```text
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

### client/.env
```text
VITE_API_URL=http://localhost:5000/api
```

## Testing
Check that the frontend can:
1. Load the current tasks.
2. Add a task.
3. Mark a task complete.
4. Edit a task.
5. Delete a task.
6. Show an error if the API is unavailable.

No `node_modules` folders are included in the ZIP.
