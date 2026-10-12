const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Workout title is required"],
      trim: true,
      minlength: [2, "Workout title must be at least 2 characters"]
    },
    load: {
      type: Number,
      required: [true, "Load is required"],
      min: [0, "Load cannot be negative"]
    },
    reps: {
      type: Number,
      required: [true, "Reps are required"],
      min: [1, "Reps must be at least 1"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Workout", workoutSchema);
