/**
 * User CRUD Web Application (Express + MongoDB + EJS)
 * 
 * Implements a complete visual User Management system:
 * 1. GET `/` - Renders the form to create a user.
 * 2. GET `/read` - Fetches and displays all users.
 * 3. GET `/edit/:id` - Fetches a single user to populate the update form.
 * 4. GET `/delete/:id` - Deletes a user by MongoDB ObjectId.
 * 5. POST `/create` - Inserts a user document and redirects to `/read`.
 * 6. POST `/update/:id` - Performs an update and redirects to `/read`.
 */

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

const userModel = require("./models/user"); // Import User model
const PORT = 9000;

// View engine setup using EJS template files
app.set("view engine", "ejs");

// Body parser middlewares for handling raw JSON and url-encoded forms
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static elements from public directory
app.use(express.static(path.join(__dirname, "public")));

// 1. Home route: Render user creation form index.ejs
app.get('/', (req, res) => {
    res.render('index');
});

// 2. Read route: Fetch all users from database and render read.ejs list
app.get('/read', async (req, res) => {
    try {
        let users = await userModel.find();
        res.render('read', { users });
    } catch (err) {
        res.status(500).send("Database error: " + err.message);
    }
});

// 3. Create route redirect fallback
app.get('/create', (req, res) => {
    res.redirect('/');
});

// 4. Delete route: Find user by ID and delete them, then redirect back to list
app.get('/delete/:id', async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        res.redirect('/read');
    } catch (err) {
        res.status(500).send("Delete operation failed: " + err.message);
    }
});

// 5. Edit route (GET): Fetch user data and render edit.ejs containing current values
app.get('/edit/:id', async (req, res) => {
    try {
        let user = await userModel.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.render('edit', { user });
    } catch (err) {
        res.status(500).send("Edit fetch failed: " + err.message);
    }
});

// 6. Update route (POST): Update details using mongoose findOneAndUpdate
app.post('/update/:id', async (req, res) => {
    try {
        let { name, email, image } = req.body;
        await userModel.findOneAndUpdate(
            { _id: req.params.id },
            { image, name, email },
            { new: true } // Return the modified document
        );
        res.redirect('/read');
    } catch (err) {
        res.status(500).send("Update failed: " + err.message);
    }
});

// 7. Create route (POST): Insert user data
app.post('/create', async (req, res) => {
    try {
        let { name, email, image } = req.body;
        await userModel.create({
            name,
            image,
            email
        });
        res.redirect('/read');
    } catch (err) {
        res.status(500).send("Create failed: " + err.message);
    }
});

// Run server on port 9000
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});