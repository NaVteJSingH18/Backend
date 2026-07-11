/**
 * Core Node.js HTTP Server Practice
 * 
 * This file demonstrates how to build a basic HTTP server using Node's native 'http' module.
 * It manually parses incoming request URLs, routes requests based on the URL path, 
 * handles different HTTP methods (GET, POST), and logs incoming requests to a text file.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Resolve the log file path relative to this script's folder
const logFilePath = path.join(__dirname, 'file.txt');

// Create the HTTP server instance
const myserver = http.createServer((req, res) => {
    // Construct a log message with the current date, request method, and requested URL
    const log = `${new Date().toISOString()} : ${req.method} ${req.url} New request received\n`;

    // Parse the request URL using the browser-compatible URL class.
    // Specifying the host header helps parse query parameters correctly.
    const myURL = new URL(req.url, `http://${req.headers.host}`);

    // Append request logs to file.txt asynchronously (non-blocking)
    fs.appendFile(logFilePath, log, (err) => {
        if (err) {
            console.error("Failed to write request log:", err);
        }

        // Basic path and method-based routing
        switch (myURL.pathname) {
            case '/':
                if (req.method === 'GET') {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end('home');
                } else {
                    res.writeHead(405, { 'Content-Type': 'text/plain' });
                    res.end('Method Not Allowed');
                }
                break;

            case '/about':
                // Retrieve the 'username' query parameter (e.g. /about?username=navtej)
                // Fall back to 'guest' if not provided
                const username = myURL.searchParams.get('username') || 'guest';
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`this is ${username}'s about page`);
                break;

            case '/signup':
                if (req.method === 'GET') {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end('this is signup page');
                } else if (req.method === 'POST') {
                    // Handle POST request (e.g. form submission)
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end('success');
                } else {
                    res.writeHead(405, { 'Content-Type': 'text/plain' });
                    res.end('Method Not Allowed');
                }
                break;

            default:
                // Handle 404 (Not Found) for unrecognized paths
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 page not found');
        }
    });
});

// Start the server listening on Port 4000
myserver.listen(4000, () => {
    console.log('server is running at http://localhost:4000');
});
