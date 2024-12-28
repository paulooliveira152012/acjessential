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
app.use(cors()); // Default CORS configuration allows all origins
console.log("CORS is enabled");

// Enable preflight requests
app.options("*", cors());

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