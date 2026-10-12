# Workout Buddy - Backend

This is the Express + MongoDB + Mongoose API for Task 35.

## Structure

- `server.js` - starts Express and connects to MongoDB
- `config/db.js` - MongoDB connection
- `models/Workout.js` - workout schema
- `controllers/workoutController.js` - CRUD controller logic
- `routes/workoutRoutes.js` - API routes

## Workout model

Fields:

- `title` - required string
- `load` - required number, cannot be negative
- `reps` - required number, minimum 1
- `createdAt` / `updatedAt` - generated timestamps

## API

### Get workouts

`GET /api/workouts`

Returns the latest workouts first.

### Create workout

`POST /api/workouts`

Example body:

```json
{
  "title": "Bench Press",
  "load": 70,
  "reps": 10
}
```

### Delete workout

`DELETE /api/workouts/:id`

Returns the deleted workout id.

## Setup

1. Install Node.js.
2. Create a MongoDB Atlas cluster.
3. Copy `.env.example` to `.env`.
4. Put your MongoDB Atlas connection string in `MONGO_URI`.
5. Run:

```text
npm install
npm start
```

The server uses port 5000 by default.
