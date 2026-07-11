/**
 * User Authentication System (Express + Bcrypt + JWT + Cookies)
 * 
 * Implements complete security flow:
 * 1. User Registration: /create
 *    - Hashes password using bcrypt.
 *    - Saves user to MongoDB.
 *    - Generates a signed JWT containing user's email.
 *    - Sets the JWT as a cookie on the client's browser.
 * 2. User Login: /login
 *    - Checks if the user exists.
 *    - Compares plaintext input password with hashed database password.
 *    - If correct, signs a new JWT token and sets it as a cookie.
 * 3. User Logout: /logout
 *    - Clears the JWT token cookie and redirects home.
 */

const express = require('express');
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const bcrypt = require("bcrypt");
const userModel = require("./models/user"); // Import User Model

const app = express();
const PORT = 8000;
const JWT_SECRET = "shhhhhhhh"; // secret signature key for JWT tokens

// Enable middleware to read cookies
app.use(cookieParser());

// Enable request body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home Route
app.get("/", (req, res) => {
    res.send("home");
});

// 1. User Registration (POST)
app.post("/create", (req, res) => {
    let { username, email, password, age } = req.body;

    // Generate Salt rounds (10) for bcrypt hashing
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.status(500).send("Salt generation failed");

        // Hash the plaintext password using salt
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) return res.status(500).send("Password hashing failed");

            try {
                // Create user with hashed password in database
                let createdUser = await userModel.create({
                    username,
                    email,
                    password: hash,
                    age
                });

                // Sign JWT token containing user's email
                let token = jwt.sign({ email }, JWT_SECRET);
                
                // Save JWT as cookie
                res.cookie("token", token);
                
                res.status(201).send(createdUser);
            } catch (dbErr) {
                res.status(500).send("User registration failed: " + dbErr.message);
            }
        });
    });
});

// 2. User Login (POST)
app.post("/login", async (req, res) => {
    try {
        // Find user by email
        let user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Compare input password with stored hashed password
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) return res.status(500).send("Error during password validation");

            if (result) {
                // Sign JWT token if password matches
                let token = jwt.sign({ email: user.email }, JWT_SECRET);
                res.cookie("token", token);
                res.status(200).send("yes you can login");
            } else {
                res.status(401).send("something is wrong - invalid password");
            }
        });
    } catch (err) {
        res.status(500).send("Login failed: " + err.message);
    }
});

// 3. User Logout (POST)
app.post('/logout', (req, res) => {
    // Clear the token cookie by setting its value to empty
    res.cookie("token", "");
    res.redirect("/");
});

// Start listening on port 8000
app.listen(PORT, () => {
    console.log(`Authentication app running at http://localhost:${PORT}`);
});