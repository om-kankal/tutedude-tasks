import React from "react";
import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import "./style.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/login", label: "Login" },
  { to: "/signup", label: "Sign Up" }
];

function Layout({ children }) {
  return (
    <div className="app">
      <header className="navbar">
        <Link to="/" className="brand">
          <span className="brand-mark">SB</span>
          Skate Hub
        </Link>

        <nav>
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              end={item.to === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <p>Skate Hub · React Router DOM demo</p>
      </footer>
    </div>
  );
}

function Home() {
  return (
    <section className="hero page-section">
      <div className="hero-copy">
        <p className="tag">Skate culture / 2026</p>
        <h1>Find your line.<br />Ride your own way.</h1>
        <p className="lead">
          A simple React app showing navigation between different routes
          with react-router-dom.
        </p>
        <div className="button-row">
          <Link to="/dashboard" className="button primary">Open Dashboard</Link>
          <Link to="/signup" className="button secondary">Create Account</Link>
        </div>
      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=1200&q=80"
          alt="Skateboarder riding outdoors"
        />
      </div>
    </section>
  );
}

function Dashboard() {
  return (
    <section className="dashboard page-section">
      <div className="section-heading">
        <p className="tag">Dashboard</p>
        <h1>Keep your sessions moving.</h1>
        <p>Track practice, favorite spots and your latest skate goals.</p>
      </div>

      <div className="dashboard-grid">
        <div className="info-card large">
          <span>Current goal</span>
          <h2>Kickflip consistency</h2>
          <div className="progress">
            <span />
          </div>
          <small>72% complete</small>
        </div>
        <div className="info-card">
          <span>This week</span>
          <strong>5</strong>
          <p>Sessions</p>
        </div>
        <div className="info-card">
          <span>Favorite spot</span>
          <strong>South Plaza</strong>
          <p>Street course</p>
        </div>
      </div>

      <div className="wide-image">
        <img
          src="https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=1400&q=80"
          alt="Outdoor skateboarding spot"
        />
      </div>
    </section>
  );
}

function Login() {
  return (
    <section className="form-page page-section">
      <div className="form-card">
        <p className="tag">Welcome back</p>
        <h1>Login</h1>
        <p className="muted">Enter your details to continue.</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Email
            <input type="email" placeholder="you@example.com" />
          </label>
          <label>
            Password
            <input type="password" placeholder="Password" />
          </label>
          <button type="submit" className="button primary full">Login</button>
        </form>
        <p className="switch">New here? <Link to="/signup">Create an account</Link></p>
      </div>
    </section>
  );
}

function Signup() {
  return (
    <section className="form-page page-section">
      <div className="form-card">
        <p className="tag">Join the community</p>
        <h1>Sign Up</h1>
        <p className="muted">Create a free account to save your progress.</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Full Name
            <input type="text" placeholder="Your name" />
          </label>
          <label>
            Email
            <input type="email" placeholder="you@example.com" />
          </label>
          <label>
            Password
            <input type="password" placeholder="Create a password" />
          </label>
          <button type="submit" className="button primary full">Sign Up</button>
        </form>
        <p className="switch">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </section>
  );
}

function NotFound() {
  return (
    <section className="not-found page-section">
      <p className="tag">404</p>
      <h1>Page not found.</h1>
      <Link to="/" className="button primary">Back Home</Link>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
