/**
 * Mongoose User Schema and Model
 * 
 * Sets up a connection to the local MongoDB database ('mongopractice')
 * and defines the schema structure for 'user' documents.
 */

const mongoose = require("mongoose");

// Connect to MongoDB database named 'mongopractice'
mongoose.connect(`mongodb://127.0.0.1:27017/mongopractice`)
    .then(() => console.log("Connected to MongoDB for CRUD practice"))
    .catch(err => console.error("MongoDB connection error:", err));

// Define the blueprint/schema for our User documents
const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
});

// Export the Mongoose model to perform CRUD operations on the 'users' collection
module.exports = mongoose.model("user", userSchema);