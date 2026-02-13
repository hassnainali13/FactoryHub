require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const workspaceRoutes = require("./routes/workspaceRoutes");
const User = require("./models/User");
const superAdminRoutes = require("./routes/superAdminRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Fix: uploads folder ko Vercel pe safe static serve
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.error("Database connection error:", error));

// Token Auth Middleware
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Access denied" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.userId = decoded.userId;
    next();
  });
};

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/superadmin", superAdminRoutes);

// Protected Route
app.get("/api/auth/me", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate({
      path: "workspaceId",
      select: "name logo status code role",
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("FactoryHub Backend is live and running!");
});

// ✅ Extra test route (helps confirm Vercel routing)
app.get("/api", (req, res) => {
  res.json({ message: "FactoryHub API is working!" });
});

// ✅ Vercel needs export
module.exports = app;
