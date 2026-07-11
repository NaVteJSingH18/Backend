/**
 * Configuration Keys
 * 
 * Exports global key secrets used across the application.
 */

module.exports = {
    JWT_KEY: process.env.JWT_KEY || "e-commerce-secret-key-fallback"
};