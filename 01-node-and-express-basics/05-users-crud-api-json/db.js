/**
 * Database Connection Setup
 * 
 * Establishes a connection to MongoDB using Mongoose.
 * Uses environment variables for the connection URI.
 */

const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

// Retrieve the Mongo URI from environment variables or fallback to local MongoDB instance
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";

mongoose.connect(`${mongoURI}/youtube-app-1`)
.then(() => {
    console.log("Successfully connected to MongoDB Cluster0 (youtube-app-1)");
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
});