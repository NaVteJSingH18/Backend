/**
 * Basic Express.js Web Server (Hello World)
 * 
 * Demonstrates the basic anatomy of an Express application:
 * 1. Loading environment variables from a .env file.
 * 2. Initializing an Express application.
 * 3. Setting up routes for GET requests.
 * 4. Listening on a port (using environment variables if present).
 */

require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const app = express();

// Define port priority: environment PORT (if defined) or fallback to 4000
const port = process.env.PORT || 4000;

// Route handler for the homepage
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route handler for '/twitter' path
app.get('/twitter', (req, res) => {
    res.send('twitterdotcom');
});

// Route handler for '/login' path sending HTML content
app.get('/login', (req, res) => {
    res.send('<h1>please login</h1>');
});

// Start the server and listen on the resolved port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
