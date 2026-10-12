# Task 34 - Express.js, Mongoose and React

This submission contains both required parts.

## Part 1 - Express.js + MongoDB

The `server` folder contains:
- A Mongoose `User` schema with `name` and `email`
- A Mongoose `Post` schema with `title`, `content` and a reference to `User`
- `POST /api/users`
- `POST /api/posts`
- `GET /api/posts`

Posts are populated with their linked user so the frontend can display user information.

## Part 2 - React

The `client` folder contains:
- User input form
- Post input form
- POST API calls
- GET API call for posts
- Dynamic post list with linked user information
- Basic loading and error handling

## Setup

### Backend
```text
cd server
npm install
copy .env.example .env
```

Set your MongoDB connection string in `.env`:

```text
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/task34_blog
CLIENT_URL=http://localhost:5173
```

Run:
```text
npm start
```

### Frontend
In a second terminal:
```text
cd client
npm install
npm start
```

Open the Vite address in your browser.

## Note
No `node_modules` are included in the submission ZIP.
