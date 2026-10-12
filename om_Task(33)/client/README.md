# Task 33 - React Frontend Integration

## Overview
This React frontend integrates with the Express/MongoDB API in the sibling `server` folder.

## Features
- Loads tasks from `GET /api/tasks`
- Creates tasks with `POST /api/tasks`
- Marks tasks complete/incomplete with `PUT /api/tasks/:id`
- Edits tasks with `PUT /api/tasks/:id`
- Deletes tasks with `DELETE /api/tasks/:id`
- Filters all, active and completed tasks
- Displays API/network error messages
- Responsive layout

## Setup

1. Open the `client` folder.
2. Run:
   `npm install`
3. Copy `.env.example` to `.env` if you need a custom API URL.
4. Run:
   `npm start`

The Vite development server normally opens at `http://localhost:5173`.

The Express server should be running at `http://localhost:5000`.
