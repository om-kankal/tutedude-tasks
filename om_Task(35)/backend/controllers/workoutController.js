const Workout = require("../models/Workout");

const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch workouts" });
  }
};

const createWorkout = async (req, res) => {
  try {
    const workout = await Workout.create({
      title: req.body.title,
      load: req.body.load,
      reps: req.body.reps
    });

    res.status(201).json(workout);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((item) => item.message);
      return res.status(400).json({
        message: "Please check the form",
        errors: messages
      });
    }

    res.status(500).json({ message: "Could not create workout" });
  }
};

const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json({
      message: "Workout deleted",
      id: req.params.id
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid workout id" });
    }

    res.status(500).json({ message: "Could not delete workout" });
  }
};

module.exports = {
  getWorkouts,
  createWorkout,
  deleteWorkout
};
