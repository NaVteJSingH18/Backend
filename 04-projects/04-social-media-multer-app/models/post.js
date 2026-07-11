/**
 * Mongoose Post Schema (Social Media App)
 * 
 * Defines the schema layout for posts. Each post contains a reference to
 * its author (user), creation timestamp, post content, and an array of
 * users who have liked the post (enabling like counting and like toggle actions).
 */

const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    // Reference to the post author
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: String,
    // Array of User ObjectIds who liked this post
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ]
});

module.exports = mongoose.model("post", postSchema);