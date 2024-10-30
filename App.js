const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const booksRoutes = require("./routes/books"); // No need for .js
const userRoutes = require("./routes/user"); // No need for .js
const path = require("path");

require("dotenv").config(); // Load environment variables from .env file

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.error("Erreur de connexion à MongoDB :", error));

// Enable CORS for all routes
app.use(cors());

// For parsing JSON requests
app.use(express.json());

// This middleware is optional since you're already using cors
// If you use cors(), you don't need to manually set headers like this
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Define routes
app.use("/api/books", booksRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app; // Use module.exports
