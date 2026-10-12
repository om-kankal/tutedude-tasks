const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Post = require("./models/Post");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "Task 34 API is running" });
});

app.post("/api/users", async (req, res) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required"
      });
    }

    const user = await User.create({ name, email });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create user"
    });
  }
});

app.post("/api/posts", async (req, res) => {
  try {
    const title = String(req.body.title || "").trim();
    const content = String(req.body.content || "").trim();
    const userId = String(req.body.userId || "").trim();

    if (!title || !content || !userId) {
      return res.status(400).json({
        message: "Title, content and userId are required"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid user id"
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const post = await Post.create({
      title,
      content,
      user: user._id
    });

    const populatedPost = await Post.findById(post._id).populate(
      "user",
      "name email"
    );

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create post"
    });
  }
});

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch posts"
    });
  }
});

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error(
        "MONGODB_URI is missing. Copy .env.example to .env and set your MongoDB connection string."
      );
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

startServer();
