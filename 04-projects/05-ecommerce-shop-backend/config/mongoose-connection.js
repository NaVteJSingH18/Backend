/**
 * Database Connection Setup (E-Commerce App)
 * 
 * Configures connection to MongoDB database ('e-commerce') using Mongoose.
 * Uses environment variable or local fallback.
 */

const mongoose = require("mongoose");
const configKeys = require("./keys");

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/e-commerce")
        // Fixed bug: passing a function reference instead of executing immediately
        .then(() => {
            console.log("Successfully connected to MongoDB (e-commerce)");
        })
        .catch((error) => {
            console.error("MongoDB connection error:", error);
        });

module.exports = mongoose.connection;   