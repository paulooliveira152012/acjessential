// Import express, mongoose, and other required packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Import environment variables
require("dotenv").config();

// Import routers
const appointmentRouter = require("./routes/appointments");
const adminRouter = require("./routes/adm");

// Initialize express app
const app = express();

console.log("Server reached");

// Configure CORS
const allowedOrigins = [
  "https://acjessential.vercel.app",
  "https://acjessential-git-main-paulo-oliveiras-projects-d0079d90.vercel.app"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
console.log("CORS is enabled");

// Handle JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define API routes
app.use("/api/appointments", appointmentRouter);
app.use("/api/admin", adminRouter);

// Serve React static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
}

// Handle unhandled routes (fallback for 404 errors)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Export the app for Vercel serverless function
module.exports = app;
