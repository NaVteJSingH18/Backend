/**
 * Authentication Controller (E-Commerce App)
 * 
 * Exposes core controllers:
 * 1. registerUser: creates new users, hashes password, generates JWT, and sets client cookie.
 * 2. loginUser: validates pre-existing users, verifies password, and sets JWT cookie.
 */

const bcrypt = require("bcrypt");
const userModel = require("../models/user-model");
const { generateToken } = require("../utils/generateToken");

/**
 * Register User Controller
 */
module.exports.registerUser = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;

    // Check if the user already exists
    let user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(400).send("User already exists");
    }

    // Generate Salt rounds
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).send("Salt generation failed");

      // Hash password
      bcrypt.hash(password, salt, async (error, hash) => {
        if (error) {
          return res.status(500).send(error.message);
        }

        try {
          // Create the user in MongoDB database
          const newuser = await userModel.create({
            fullname,
            email,
            password: hash,
          });

          // Generate signed JWT token
          let token = generateToken(newuser);

          // Store the JWT token as cookie
          res.cookie("token", token);
          return res.status(201).send(newuser);
        } catch (dbError) {
          return res.status(500).send("Database error: " + dbError.message);
        }
      });
    });

  } catch (error) {
    return res.status(500).send(error.message);
  }
};

/**
 * Login User Controller
 */
module.exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Check user existence
    let user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).send("User not found");
    }

    // Compare passwords using bcrypt
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) return res.status(500).send("Password verification error");
      if (!result) {
          return res.status(401).send("Invalid credentials");
      }

      // Generate signed token
      let token = generateToken(user);
      
      // Store token as cookie
      res.cookie("token", token);
      res.status(200).send("Logged in successfully");
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};