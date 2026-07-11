/**
 * Social Media Application Backend (Multer + JWT + Relationships)
 * 
 * Implements core social platform backend features:
 * 1. Authentication (JWT cookies and bcrypt hashes) and route protection via `isLoggedIn` middleware.
 * 2. File upload processing via Multer to upload and associate profile pictures.
 * 3. Bidirectional data mapping: Authoring posts & liking/unliking posts.
 * 4. Document population via `.populate(...)` to resolve referenced models.
 */

const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userModel = require("./models/user"); // Import User model
const postModel = require("./models/post"); // Import Post model
const upload = require("./config/multerconfig"); // Import configured Multer file upload instance

const app = express();
const PORT = 3000;
const JWT_SECRET = "shhhh"; // JWT Secret signature token

// Configure JSON and Form Data body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable reading cookies
app.use(cookieParser());

// 1. Protection Middleware: Verifies JWT token presence and authenticity
function isLoggedIn(req, res, next) {
    if (!req.cookies.token) {
        return res.status(401).send("you must be logged in");
    }

    try {
        // Decode and verify the JWT token
        let data = jwt.verify(req.cookies.token, JWT_SECRET);
        req.user = data; // Attach payload details (email, userid) to request object
        next();
    } catch (err) {
        return res.status(401).send("invalid token");
    }
}

// 2. GET Login Page (Mock route representation)
app.get('/login', (req, res) => {
    res.send("login page");
});

// 3. GET Profile: Populates user posts and displays JSON user profiles
app.get('/profile', isLoggedIn, async (req, res) => {
    try {
        // Fetch user from DB and populate their full post objects
        let user = await userModel.findOne({ email: req.user.email }).populate("posts");
        res.json({ message: "welcome to profile", user });
    } catch (err) {
        res.status(500).send("Failed to load profile: " + err.message);
    }
});

// 4. POST Upload Profile Picture: Handles image upload via Multer and updates user document
app.post("/upload", isLoggedIn, upload.single("image"), async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded");
    }

    try {
        let user = await userModel.findOne({ email: req.user.email });
        user.profilepic = req.file.filename; // Save uploaded filename to user document
        await user.save();

        res.json({
            message: "Profile picture uploaded successfully",
            file: req.file.filename
        });
    } catch (err) {
        res.status(500).send("Failed to save profile picture: " + err.message);
    }
});

// 5. GET Like/Unlike Toggle: Adds or removes user ID from a post's likes array
app.get('/like/:id', isLoggedIn, async (req, res) => {
    try {
        let post = await postModel.findOne({ _id: req.params.id });
        if (!post) {
            return res.status(404).send("Post not found");
        }

        // Toggle user like: if already liked, unlike. Otherwise, add user like.
        const likeIndex = post.likes.indexOf(req.user.userid);
        if (likeIndex === -1) {
            post.likes.push(req.user.userid);
        } else {
            post.likes.splice(likeIndex, 1);
        }
        await post.save();

        // Redirect back to profile page (Note: removed duplicate res.json to prevent header errors)
        res.redirect("/profile");
    } catch (err) {
        res.status(500).send("Like operation failed: " + err.message);
    }
});

// 6. POST Create Post: Saves post and appends its ID to author's posts list
app.post('/post', isLoggedIn, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        let { content } = req.body;

        // Create the post document
        let post = await postModel.create({
            user: user._id,
            content
        });

        // Add post ID reference to user model
        user.posts.push(post._id);
        await user.save();

        res.status(201).send("Post created successfully");
    } catch (err) {
        res.status(500).send("Post creation failed: " + err.message);
    }
});

// 7. POST User Registration
app.post('/register', async (req, res) => {
    let { email, username, name, password, age } = req.body;

    try {
        let existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send("user already registered");
        }

        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.status(500).send("Salt generation error");

            bcrypt.hash(password, salt, async (hashErr, hash) => {
                if (hashErr) return res.status(500).send("Hashing error");

                let user = await userModel.create({
                    username,
                    email,
                    age,
                    name,
                    password: hash
                });

                // Generate cookie with email and user ID
                let token = jwt.sign({ email: email, userid: user._id }, JWT_SECRET);
                res.cookie("token", token);
                res.status(201).send("registered");
            });
        });
    } catch (err) {
        res.status(500).send("Registration failed: " + err.message);
    }
});

// 8. POST User Login
app.post('/login', async (req, res) => {
    let { email, password } = req.body;

    try {
        let user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send("User not found");
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let token = jwt.sign({ email: email, userid: user._id }, JWT_SECRET);
                res.cookie("token", token);
                res.status(200).send("you can login");
            } else {
                // Fixed crash issue on err.message when err is undefined by responding with standard error text
                res.status(401).send("Invalid credentials");
            }
        });
    } catch (err) {
        res.status(500).send("Login failed: " + err.message);
    }
});

// 9. GET User Logout
app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
});

// Start server
app.listen(PORT, () => {
    console.log(`Social Media App server running at http://localhost:${PORT}`);
});
