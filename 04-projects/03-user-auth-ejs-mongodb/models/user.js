/**
 * Mongoose User Schema for User Authentication EJS Application
 * 
 * Configures connection to database 'hashUsers' and defines user properties
 * including the hashed password string.
 */

const mongoose = require('mongoose');

// Connect to MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/hashUsers")
    .then(() => console.log("Connected to MongoDB for User Auth EJS application"))
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

// Schema layout including username, email, age, and hashed password field
const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: {
        type: String,
        required: true // Password must be stored for authentication
    },
    age: Number
});

module.exports = mongoose.model('user', userSchema);
