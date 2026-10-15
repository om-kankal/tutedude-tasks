# Task 36 - JWT Authentication Frontend

## Features
- Registration form
- Login form
- Stores returned JWT in `localStorage`
- Reads the stored token after refresh
- Sends JWT as a Bearer token to the protected route
- Displays the protected response
- Logout clears the saved token
- Error and loading messages

## Run

```text
npm install
npm start
```

The frontend normally runs at `http://localhost:5173`.

The Express backend should run at `http://localhost:5000`.

You can optionally copy `.env.example` to `.env` to set another API URL.

## Flow

1. Register a user.
2. Log in with the same credentials.
3. The JWT returned by the backend is saved in `localStorage`.
4. Click "Access Protected Route".
5. The frontend sends `Authorization: Bearer <token>`.
6. The backend verifies the token in middleware.
