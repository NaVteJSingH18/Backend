/**
 * Mongoose Data Association Express App
 * 
 * Demonstrates how to handle references between different database models.
 * Steps shown:
 * 1. Creating a parent User document.
 * 2. Creating a child Post document referencing that user.
 * 3. Appending the child post's ObjectId to the user's `posts` array.
 */

const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const postModel = require("./models/post");

const app = express();
const PORT = 8000;

// Root testing route
app.get("/", (req, res) => {
    res.send("hi");
});

// Create a User document
app.get("/create", async (req, res) => {
    try {
        let user = await userModel.create({
            username: "navtej",
            email: "navtej@gmail.com",
            age: 21
        });
        res.status(201).send(user);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Create a Post and associate it with a User
app.get("/post/create", async (req, res) => {
    try {
        // Find user by a hardcoded ID or grab the first available user as a fallback
        let targetUserId = "69b304da089c18ec4ee927d8";
        let user = await userModel.findOne({ _id: targetUserId });

        if (!user) {
            // Fallback: search for any user in the database to prevent crashes
            user = await userModel.findOne();
        }

        if (!user) {
            return res.status(400).send("No users found in database. Please run /create first.");
        }

        // Create the post referencing the found user's ID
        let post = await postModel.create({
            postdata: "seedhe maut jal aur jeevan dono",
            user: user._id,
        });

        // Push the post's ObjectId into the user's posts list and save
        user.posts.push(post._id);
        await user.save();

        res.status(201).send({ post, user });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Start the server and log message correctly
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});