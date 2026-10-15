const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const crypto = require("crypto");
const requireAuth = require("./middleware/authMiddleware");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

const users = [];

function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

app.get("/api/health", (req, res) => {
  res.json({ message: "JWT auth server is running" });
});

app.post("/api/register", (req, res) => {
  const username = String(req.body.username || "").trim();
  const password = String(req.body.password || "");

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required"
    });
  }

  if (password.length < 4) {
    return res.status(400).json({
      message: "Password must be at least 4 characters"
    });
  }

  const exists = users.some(
    (user) => user.username.toLowerCase() === username.toLowerCase()
  );

  if (exists) {
    return res.status(409).json({
      message: "Username already exists"
    });
  }

  const user = {
    id: crypto.randomUUID(),
    username,
    password
  };

  users.push(user);

  res.status(201).json({
    message: "Registration successful"
  });
});

app.post("/api/login", (req, res) => {
  const username = String(req.body.username || "").trim();
  const password = String(req.body.password || "");

  const user = users.find(
    (item) =>
      item.username.toLowerCase() === username.toLowerCase() &&
      item.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid username or password"
    });
  }

  const token = createToken(user);

  res.json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      username: user.username
    }
  });
});

app.get("/api/protected", requireAuth, (req, res) => {
  res.json({
    message: `Welcome ${req.user.username}. You reached the protected route.`,
    user: req.user
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is missing. Copy .env.example to .env first.");
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
