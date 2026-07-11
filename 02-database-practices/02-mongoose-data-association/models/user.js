/**
 * Mongoose User Schema (with Data Association references)
 * 
 * Demonstrates a "one-to-many" relationship where a User document holds
 * an array of ObjectIds referencing the Post model.
 */

const mongoose = require("mongoose");

// Connect to MongoDB database named 'dataAssociation'
mongoose.connect("mongodb://127.0.0.1:27017/dataAssociation")
    .then(() => console.log("Connected to MongoDB for Data Association practice"))
    .catch((err) => {
        console.error("MongoDB dataAssociation connection error:", err);
    });

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    // Array of ObjectIds referencing the 'post' collection.
    // This allows us to populate user posts using .populate('posts').
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"        
    }]
});

module.exports = mongoose.model("user", userSchema);
