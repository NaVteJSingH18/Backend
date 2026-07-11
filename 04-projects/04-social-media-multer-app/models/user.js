/**
 * Mongoose User Schema (Social Media App)
 * 
 * Defines the user schema representing a social media profile,
 * complete with details, a profile picture name, and an array of
 * posts authored by the user.
 */

const mongoose = require('mongoose');

// Connect to MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/miniProject")
    .then(() => console.log("Connected to MongoDB for Social Media App"))
    .catch((err) => {
        console.error("MongoDB miniProject connection error:", err);
    });

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    age: Number,
    email: String,
    password: {
        type: String,
        required: true
    },
    profilepic: {
        type: String,
        default: "default.png" // Fallback profile image name
    },
    // List of posts authored by this user, referencing the 'post' collection
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }]
});

module.exports = mongoose.model("user", userSchema);