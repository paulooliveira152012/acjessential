// Import express, the framework for server and API's requests
const express = require("express");
// Import mongoose
const mongoose = require("mongoose");
// Import dotenv to use environment variables
require("dotenv").config();
// Import router
const appointmentRouter = require("./routes/appointments");
const adminRouter = require("./routes/adm");

// Import cors
const cors = require("cors");



// Allow all origins
const corsOptions = {
  origin: "*", // Allow all origins
  credentials: false, // Credentials are not allowed when origin is "*"
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify allowed HTTP methods
  optionsSuccessStatus: 204 // For legacy browsers
};


// serve frontend
const path = require("path");

// Implement express
const app = express();

// Allow CORS
app.use(cors(corsOptions));
console.log("CORS is enabled");

app.options("*", cors(corsOptions)); // Enable preflight requests

// Use express
app.use(express.json());

// MongoConnection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDb"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

app.use("/api/appointments", appointmentRouter);
app.use("/api/admin", adminRouter); // Routes for admin login

// serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));

  // handle all other requests by serving the React frontend
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("Wasn't able to find serving files"));
}

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
