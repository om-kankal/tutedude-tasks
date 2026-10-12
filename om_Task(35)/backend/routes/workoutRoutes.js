const express = require("express");
const {
  getWorkouts,
  createWorkout,
  deleteWorkout
} = require("../controllers/workoutController");

const router = express.Router();

router.get("/", getWorkouts);
router.post("/", createWorkout);
router.delete("/:id", deleteWorkout);

module.exports = router;
