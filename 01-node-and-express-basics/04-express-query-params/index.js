/**
 * Express Query Parameters Practice
 * 
 * Demonstrates how to read query parameters sent by the client via Express routing.
 * Example URL format: http://localhost:4000/about?name=Navtej&age=21
 */

const express = require('express');
const app = express();
const port = 4000;

// Homepage route handler
app.get('/', (req, res) => {    
    return res.send('hello from home');
});

// About route handler demonstrating retrieval of query parameters
// req.query is automatically populated by Express with URL query string values.
app.get('/about', (req, res) => {
    const name = req.query.name || 'guest';
    const age = req.query.age || 'unknown';
    return res.send(`hello from about page. Hey ${name}, age is ${age}`);
});

// Start listening on port 4000
app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});