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

const allowedOrigins = [
  "https://acjessential-a07ou6a0j-paulo-oliveiras-projects-d0079d90.vercel.app",
  // this is the one activily serving
  "http://localhost:3000",
  "*"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Reject the request
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies or other credentials
  optionsSuccessStatus: 204,
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
