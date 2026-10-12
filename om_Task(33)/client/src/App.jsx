import React, { useEffect, useMemo, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const visibleTasks = useMemo(() => {
    if (filter === "active") {
      return tasks.filter((task) => !task.completed);
    }

    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    }

    return tasks;
  }, [tasks, filter]);

  const completedCount = tasks.filter((task) => task.completed).length;

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/tasks`);

      if (!response.ok) {
        throw new Error("Could not load tasks");
      }

      const data = await response.json();
      setTasks(data);
      setMessage("");
    } catch (error) {
      setMessage("Could not connect to the API. Start the server and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setMessage("Please enter a task title.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      const isEditing = Boolean(editingId);
      const url = isEditing
        ? `${API_URL}/tasks/${editingId}`
        : `${API_URL}/tasks`;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title.trim(),
          description
        })
      });

      const data = response.status === 204 ? null : await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Request failed");
      }

      if (isEditing) {
        setTasks((current) =>
          current.map((task) => (task._id === data._id ? data : task))
        );
        setMessage("Task updated.");
      } else {
        setTasks((current) => [data, ...current]);
        setMessage("Task added.");
      }

      resetForm();
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const toggleTask = async (task) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          completed: !task.completed
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not update task");
      }

      setTasks((current) =>
        current.map((item) => (item._id === data._id ? data : item))
      );
    } catch (error) {
      setMessage(error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Could not delete task");
      }

      setTasks((current) => current.filter((task) => task._id !== id));

      if (editingId === id) {
        resetForm();
      }

      setMessage("Task deleted.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const editTask = (task) => {
    setEditingId(task._id);
    setTitle(task.title);
    setDescription(task.description || "");
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <p className="eyebrow">Task 33 · Full stack</p>
          <h1>Task Board</h1>
          <p className="subtext">React + Express + MongoDB</p>
        </div>
        <div className="stats">
          <span>{tasks.length} total</span>
          <span>{completedCount} done</span>
        </div>
      </header>

      <main className="layout">
        <section className="editor-card">
          <div className="section-title">
            <div>
              <p className="eyebrow">{editingId ? "Edit task" : "New task"}</p>
              <h2>{editingId ? "Update a task" : "Add a task"}</h2>
            </div>
            {editingId && (
              <button className="text-button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              Task title
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. Complete API assignment"
              />
            </label>

            <label>
              Description
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Add a little detail..."
                rows="4"
              />
            </label>

            <button className="primary-button" disabled={saving}>
              {saving ? "Saving..." : editingId ? "Update Task" : "Add Task"}
            </button>
          </form>

          {message && <div className="message">{message}</div>}
        </section>

        <section className="tasks-card">
          <div className="section-title list-heading">
            <div>
              <p className="eyebrow">Your work</p>
              <h2>Tasks</h2>
            </div>

            <div className="filters">
              {["all", "active", "completed"].map((item) => (
                <button
                  key={item}
                  className={filter === item ? "filter active" : "filter"}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="empty">Loading tasks...</div>
          ) : visibleTasks.length === 0 ? (
            <div className="empty">
              <strong>No tasks here.</strong>
              <span>Add a task or change the filter.</span>
            </div>
          ) : (
            <div className="task-list">
              {visibleTasks.map((task) => (
                <article className={task.completed ? "task done" : "task"} key={task._id}>
                  <button
                    className="check"
                    onClick={() => toggleTask(task)}
                    aria-label={`Mark ${task.title} ${task.completed ? "active" : "complete"}`}
                  >
                    {task.completed ? "✓" : ""}
                  </button>

                  <div className="task-content">
                    <h3>{task.title}</h3>
                    {task.description && <p>{task.description}</p>}
                  </div>

                  <div className="task-actions">
                    <button className="icon-button" onClick={() => editTask(task)}>
                      Edit
                    </button>
                    <button className="icon-button delete" onClick={() => deleteTask(task._id)}>
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
