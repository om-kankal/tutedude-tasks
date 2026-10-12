import { useState } from "react";
import { useWorkouts } from "./context/WorkoutContext";
import "./style.css";

function App() {
  const {
    workouts,
    loading,
    error,
    addWorkout,
    removeWorkout,
    loadWorkouts
  } = useWorkouts();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    if (!title.trim() || load === "" || reps === "") {
      setFormError("Please fill in title, load and reps.");
      return;
    }

    if (Number(load) < 0 || Number(reps) < 1) {
      setFormError("Load cannot be negative and reps must be at least 1.");
      return;
    }

    setSaving(true);

    const result = await addWorkout({
      title: title.trim(),
      load: Number(load),
      reps: Number(reps)
    });

    setSaving(false);

    if (!result.success) {
      setFormError(result.message);
      return;
    }

    setTitle("");
    setLoad("");
    setReps("");
  };

  const handleDelete = async (id) => {
    await removeWorkout(id);
  };

  const timeAgo = (date) => {
    const seconds = Math.floor(
      (Date.now() - new Date(date).getTime()) / 1000
    );

    if (seconds < 60) return "just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;

    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <p className="eyebrow">MERN CRUD + Context</p>
          <h1>Workout Buddyy</h1>
        </div>
        <button className="refresh" onClick={loadWorkouts}>
          Refresh
        </button>
      </header>

      {error && (
        <div className="server-error">
          <span>{error}</span>
        </div>
      )}

      <main className="layout">
        <section className="workouts-panel">
          <div className="section-head">
            <div>
              <p className="eyebrow">Your workouts</p>
              <h2>Latest sessions</h2>
            </div>
            <span className="count">{workouts.length}</span>
          </div>

          {loading ? (
            <div className="empty-state">Loading workouts...</div>
          ) : workouts.length === 0 ? (
            <div className="empty-state">
              <strong>No workouts yet.</strong>
              <span>Add your first workout using the form.</span>
            </div>
          ) : (
            <div className="workout-list">
              {workouts.map((workout) => (
                <article className="workout-card" key={workout._id}>
                  <div className="workout-main">
                    <h3>{workout.title}</h3>
                    <div className="details">
                      <span>Load: {workout.load} kg</span>
                      <span>Reps: {workout.reps}</span>
                      <span>Created {timeAgo(workout.createdAt)}</span>
                    </div>
                  </div>

                  <button
                    className="delete-button"
                    onClick={() => handleDelete(workout._id)}
                    title="Delete workout"
                  >
                    🗑
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="form-panel">
          <p className="eyebrow">Add a new workout</p>
          <h2>Build your session</h2>

          <form onSubmit={handleSubmit}>
            <label>
              Exercise Title
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Bench Press"
              />
            </label>

            <label>
              Load (in Kg)
              <input
                value={load}
                onChange={(event) => setLoad(event.target.value)}
                type="number"
                min="0"
                placeholder="70"
              />
            </label>

            <label>
              Reps
              <input
                value={reps}
                onChange={(event) => setReps(event.target.value)}
                type="number"
                min="1"
                placeholder="10"
              />
            </label>

            <button className="add-button" disabled={saving}>
              {saving ? "Adding..." : "Add Workout"}
            </button>
          </form>

          {formError && <p className="form-error">{formError}</p>}

          <div className="tip">
            <strong>Workout tip</strong>
            <span>Keep your form controlled and increase load gradually.</span>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
