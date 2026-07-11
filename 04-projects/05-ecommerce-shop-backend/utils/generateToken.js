/**
 * JSON Web Token Utility
 * 
 * Generates signed JWT authentication tokens for e-commerce users.
 */

const jwt = require("jsonwebtoken");

/**
 * Generate a signed JWT token containing the user's email and database id.
 * Uses JWT_KEY secret from environment variables.
 * 
 * @param {Object} user - User document from database
 * @returns {String} Signed JWT token
 */
const generateToken = (user) => {
    // Falls back to a default key if process.env.JWT_KEY is not defined
    const secret = process.env.JWT_KEY || "e-commerce-secret-key-fallback";
    return jwt.sign({ email: user.email, id: user._id }, secret);
};

module.exports.generateToken = generateToken;