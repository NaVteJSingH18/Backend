/**
 * Mongoose CRUD Operations Express App
 * 
 * Demonstrates the 4 fundamental database operations (CRUD) using Express and Mongoose:
 * 1. CREATE: `userModel.create(...)`
 * 2. READ: `userModel.find(...)`
 * 3. UPDATE: `userModel.findOneAndUpdate(...)`
 * 4. DELETE: `userModel.findOneAndDelete(...)`
 */

const express = require("express");
const mongoose = require("mongoose");
const userModel = require('./usermodel'); // Import User model

const app = express();
const PORT = 8000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send('this is home page');
});

// CREATE operation: creates a new user document in MongoDB
app.get('/create', async (req, res) => {
    try {
        let createduser = await userModel.create({
            name: 'navtej',
            email: "navtej@gmail.com",
            username: "navtej"   
        });
        res.status(201).send(createduser);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// UPDATE operation: finds a user by username and updates their email & name
app.get('/update', async (req, res) => {
    try {
        let updateduser = await userModel.findOneAndUpdate(
            { username: "navtej" },
            { name: "navi", email: "navi@gmail.com" },
            { new: true } // Return updated document (replaces legacy returnDocument: "after")
        );
        console.log("Updated user details:", updateduser);
        res.send(updateduser);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// READ operation: fetches all user documents in the collection
app.get('/read', async (req, res) => {
    try {
        let users = await userModel.find();
        res.send(users);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// DELETE operation: deletes a single user document by username
app.get('/delete', async (req, res) => {
    try {
        let deletedUser = await userModel.findOneAndDelete({ username: "navtej" });
        res.send(deletedUser || { message: "User not found to delete" });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Start listening on port 8000
app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
});