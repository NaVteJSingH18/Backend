/**
 * Mongoose Post Schema
 * 
 * Defines a post schema that references a specific User document.
 */

const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    postdata: String,
    // Reference back to the User model.
    // Each post belongs to a single user.
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    date: {
        type: Date,
        default: Date.now // Automatically sets the date to current time upon creation
    }
});

module.exports = mongoose.model("post", postSchema);
