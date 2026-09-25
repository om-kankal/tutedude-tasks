# Task 32 - Identifying APIs for To-Do List App with Express.js

## What this submission contains

`API_Plan.md` documents the REST APIs required for the To-Do List application.

It includes:

- Endpoint URLs
- HTTP methods
- Request body examples
- Expected response examples
- HTTP status codes
- Reasoning for each API
- CRUD flow for the React frontend
- Unique task ID plan
- Common error responses
- Possible implementation challenges
- Future extension ideas

## API design

Base route:

`/api/tasks`

The planned operations are:

- POST `/api/tasks` - create a task
- GET `/api/tasks` - get all tasks
- GET `/api/tasks/:id` - get one task
- PUT `/api/tasks/:id` - update a task
- DELETE `/api/tasks/:id` - delete a task

## Note

This task is an API planning exercise. No Express server implementation is included.
