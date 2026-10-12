# Task 34 - Express.js + Mongoose + React

## Backend

The `server` folder contains an Express.js API using Mongoose.

### MongoDB schemas

#### User
- name
- email

#### Post
- title
- content
- user (reference to User)

### API routes

`POST /api/users`
Creates a new user.

Request:
```json
{
  "name": "Aarav",
  "email": "aarav@example.com"
}
```

`POST /api/posts`
Creates a post linked to an existing user.

Request:
```json
{
  "title": "My first post",
  "content": "This is my first post.",
  "userId": "USER_OBJECT_ID"
}
```

`GET /api/posts`
Returns all posts and includes the linked user's name and email through Mongoose `populate()`.

## Run backend

```text
cd server
npm install
```

Copy `.env.example` to `.env` and set:

```text
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

Then run:

```text
npm start
```

The API runs on port 5000.

Use MongoDB locally or MongoDB Atlas.
