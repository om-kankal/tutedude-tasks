# Task 36 - JWT Authentication Backend

## Features
- `POST /api/register` registers a user in an in-memory array.
- `POST /api/login` validates the username and password and returns a JWT.
- `GET /api/protected` is protected by JWT middleware.
- Invalid or missing tokens return HTTP 401.

## Run

```text
npm install
```

Copy `.env.example` to `.env` and set a JWT secret.

```text
npm start
```

The API runs on port 5000.

## Example requests

Register:

```json
{
  "username": "alex",
  "password": "1234"
}
```

Login:

```json
{
  "username": "alex",
  "password": "1234"
}
```

Use the returned token in:

```text
Authorization: Bearer YOUR_TOKEN
```

for `GET /api/protected`.

## Note
This is a classroom authentication demo. Users are stored in memory and passwords are kept as plain text for simplicity; a real application should hash passwords and use a database.
