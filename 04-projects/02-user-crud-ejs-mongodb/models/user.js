/**
 * Mongoose User Schema for User CRUD EJS Application
 * 
 * Configures connection to database 'userinfodb' and defines 
 * the Schema blueprint for user records.
 */

const mongoose = require('mongoose');

// Connect to MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/userinfodb")
    .then(() => console.log("Connected to MongoDB for User CRUD EJS application"))
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

// Schema definition with name, image, and email properties
const userSchema = mongoose.Schema({
    name: String,
    image: String, // String path or URL of user avatar image
    email: String
});

module.exports = mongoose.model('user', userSchema);
