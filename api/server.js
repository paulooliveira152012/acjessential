// Import express, the framework for server and API's requests
const express = require("express");
// Import mongoose
const mongoose = require("mongoose");
// Import dotenv to use environment variables
require("dotenv").config();
// Import routers
const appointmentRouter = require("./routes/appointments");
const adminRouter = require("./routes/adm");
// Import cors for cross-origin requests
const cors = require("cors");
// serve frontend
const path = require("path");

// Implement express
const app = express();

// Allow all origins with CORS
const corsOptions = {
  origin: "https://acjessential-b3vqumrt6-paulo-oliveiras-projects-d0079d90.vercel.app", // Replace with your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Include credentials if required
};
app.use(cors(corsOptions));
console.log("CORS is enabled");

// Handle preflight requests
app.options("*", (req, res) => {
  console.log("Preflight OPTIONS request received");
  res.setHeader("Access-Control-Allow-Origin", "https://acjessential-b3vqumrt6-paulo-oliveiras-projects-d0079d90.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Add if credentials are needed
  res.sendStatus(204); // No Content
});


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});



// Use express for JSON
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDb"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Define API routes
app.use("/api/appointments", appointmentRouter);
app.use("/api/admin", adminRouter); // Routes for admin login

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));

  // Handle all other requests by serving the React frontend
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  // Development fallback
  app.get("/", (req, res) => res.send("Server running in development mode"));
}

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));