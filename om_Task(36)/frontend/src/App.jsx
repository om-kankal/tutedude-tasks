import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function App() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    username: "",
    password: ""
  });
  const [token, setToken] = useState(() => localStorage.getItem("jwtToken") || "");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [protectedMessage, setProtectedMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      const savedUser = localStorage.getItem("jwtUser");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, [token]);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const register = async (event) => {
    event.preventDefault();

    if (!form.username.trim() || !form.password) {
      setMessage("Enter a username and password.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setMessage("Registration successful. You can log in now.");
      setMode("login");
      setForm({ username: form.username, password: "" });
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (event) => {
    event.preventDefault();

    if (!form.username.trim() || !form.password) {
      setMessage("Enter a username and password.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setProtectedMessage("");

      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("jwtToken", data.token);
      localStorage.setItem("jwtUser", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);
      setMessage("Login successful.");
      setForm({ username: "", password: "" });
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const openProtectedRoute = async () => {
    try {
      setLoading(true);
      setProtectedMessage("");

      const response = await fetch(`${API_URL}/protected`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Protected route failed");
      }

      setProtectedMessage(data.message);
    } catch (error) {
      setProtectedMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("jwtUser");
    setToken("");
    setUser(null);
    setProtectedMessage("");
    setMessage("You have been logged out.");
  };

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <p className="eyebrow">Task 36 · Authentication</p>
          <h1>JWT Auth</h1>
          <p className="subtitle">
            Register, log in and access a protected route with a stored token.
          </p>
        </div>

        {token && (
          <button className="logout" onClick={logout}>
            Logout
          </button>
        )}
      </header>

      <main className="main">
        {!token ? (
          <section className="auth-card">
            <div className="tabs">
              <button
                className={mode === "login" ? "tab active" : "tab"}
                onClick={() => {
                  setMode("login");
                  setMessage("");
                }}
              >
                Login
              </button>
              <button
                className={mode === "register" ? "tab active" : "tab"}
                onClick={() => {
                  setMode("register");
                  setMessage("");
                }}
              >
                Register
              </button>
            </div>

            <p className="eyebrow">{mode === "login" ? "Welcome back" : "Create account"}</p>
            <h2>{mode === "login" ? "Sign in" : "Register user"}</h2>

            <form onSubmit={mode === "login" ? login : register}>
              <label>
                Username
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="alex"
                />
              </label>

              <label>
                Password
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimum 4 characters"
                />
              </label>

              <button className="primary" disabled={loading}>
                {loading
                  ? "Please wait..."
                  : mode === "login"
                    ? "Login"
                    : "Register"}
              </button>
            </form>

            {message && <div className="message">{message}</div>}
          </section>
        ) : (
          <section className="dashboard">
            <div className="welcome-card">
              <span className="check">✓</span>
              <div>
                <p className="eyebrow">Authenticated</p>
                <h2>Hello, {user?.username}</h2>
                <p>Your JWT is stored in localStorage.</p>
              </div>
            </div>

            <div className="protected-card">
              <p className="eyebrow">Protected route</p>
              <h2>Try the secure endpoint</h2>
              <p>
                The request below sends your saved JWT in the Authorization header.
              </p>

              <button
                className="primary"
                onClick={openProtectedRoute}
                disabled={loading}
              >
                {loading ? "Checking..." : "Access Protected Route"}
              </button>

              {protectedMessage && (
                <div className="protected-result">{protectedMessage}</div>
              )}
            </div>

            {message && <div className="message">{message}</div>}
          </section>
        )}
      </main>

      <footer>
        React frontend · Express backend · JSON Web Token demo
      </footer>
    </div>
  );
}

export default App;
