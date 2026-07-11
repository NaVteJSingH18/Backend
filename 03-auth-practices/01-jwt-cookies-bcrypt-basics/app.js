/**
 * Authentication & Security Basics Practice
 * 
 * Demonstrates:
 * 1. JSON Web Tokens (JWT): signing and sending as cookies.
 * 2. Bcrypt hashing: generating salt, hashing plaintext, and comparing hashed passwords.
 * 3. Cookie Management: setting and reading cookies using cookie-parser.
 */

const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 8000;

// Enable cookie parser middleware to read cookies from incoming requests via `req.cookies`
app.use(cookieParser());

// 1. JWT Cookie Signing Route
app.get('/', (req, res) => {
    // Sign payload with a secret key
    const token = jwt.sign({ email: "dead@pool.com" }, "secret");
    
    // Set cookie on client browser
    res.cookie('token', token);
    console.log("Generated JWT Token:", token);
    res.send('Home - JWT token cookie set!');
});

// 2. Bcrypt Hashing Route
app.get('/bcrypt-hash', (req, res) => {
    // Generate salt rounds and hash password asynchronously
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.status(500).send("Salt generation error");
        
        bcrypt.hash("46639", salt, (err, hash) => {
            if (err) return res.status(500).send("Hashing error");
            console.log("Password hash generated:", hash);
            res.send(`Bcrypt hash generated for password '46639': ${hash}`);
        });
    });
});

// 3. Bcrypt Hashing Verification Route
app.get('/bcrypt-compare', (req, res) => {
    const plainPassword = '46639';
    const storedHash = "$2b$10$3l8jzGsghl3anapudu7k9OPPNJCOHwjr5l4ZCzszsFBdvYyvJ6zFq";

    // Compare plaintext password with stored bcrypt hash
    bcrypt.compare(plainPassword, storedHash, (err, result) => {
        if (err) return res.status(500).send("Comparison error");
        console.log("Match Result:", result); // true or false
        res.send(`Password match result: ${result}`);
    });
});

// 4. Set Standard Cookie Route
app.get('/set-cookie', (req, res) => {
    // Sets a simple cookie name = navtej
    res.cookie('name', 'navtej');
    res.send('Standard cookie (name=navtej) set successfully');
});

// 5. Read Cookies Route
app.get('/read-cookies', (req, res) => {
    // req.cookies is populated by the cookie-parser middleware
    console.log("Request cookies received:", req.cookies);
    res.send({ cookies: req.cookies });
});

// Listen on Port 8000
app.listen(PORT, () => {
    console.log(`Auth basics app running at http://localhost:${PORT}`);
});