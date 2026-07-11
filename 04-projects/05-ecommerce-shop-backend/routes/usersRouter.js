/**
 * Users Router (E-Commerce App)
 * 
 * Maps authentication endpoints to the authController methods.
 */

const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controller/authController");

// GET users testing endpoint
router.get('/', (req, res) => {
    res.send("done");
});

// Bind register endpoint to registration controller
router.post("/register", registerUser);

// Bind login endpoint to login controller
router.post("/login", loginUser);

module.exports = router;
