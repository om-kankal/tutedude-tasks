# Task 33 - To-Do List Backend with Node.js, Express.js and MongoDB

## Part 1
This folder implements the APIs planned in Task 32.

### Endpoints
- `GET /api/health`
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

### MongoDB
Tasks are stored in a MongoDB database using Mongoose.

## Part 2 integration
The React client in the `client` folder consumes these APIs with `fetch()`.

## Setup

1. Install Node.js and MongoDB, or use a MongoDB Atlas database.
2. Open the `server` folder.
3. Run:
   `npm install`
4. Copy `.env.example` to `.env`.
5. Set `MONGODB_URI` to your MongoDB connection string.
6. Run:
   `npm start`

The API runs on `http://localhost:5000`.

For development:
`npm run dev`

## Notes
- The server rejects an empty task title with HTTP 400.
- Missing tasks return HTTP 404.
- Successful creation returns HTTP 201.
- Successful deletion returns HTTP 204.
