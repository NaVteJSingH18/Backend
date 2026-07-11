/**
 * ES Module Full-Stack Backend (Serving Jokes API)
 * 
 * Demonstrates:
 * 1. Using ES Module syntax ('import' statements) instead of CommonJS ('require').
 * 2. Serving a REST API joke data endpoint (/api/jokes) to be consumed by a React frontend.
 * 3. CORS and proxy considerations when developing locally.
 */

import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Base route for server health check
app.get('/', (req, res) => {
    res.send('server is ready');
});

// GET /api/jokes: Returns a JSON array of jokes to the client
app.get('/api/jokes', (req, res) => {
    const jokes = [
      {
        id: 1,
        title: "Joke 1",
        content: "Why don’t programmers like nature? Too many bugs."
      },
      {
        id: 2,
        title: "Joke 2",
        content: "Why did the JavaScript developer go broke? Because he kept using console.log."
      },
      {
        id: 3,
        title: "Joke 3",
        content: "Why do programmers prefer dark mode? Because light attracts bugs."
      },
      {
        id: 4,
        title: "Joke 4",
        content: "How many programmers does it take to change a light bulb? None. It’s a hardware problem."
      },
      {
        id: 5,
        title: "Joke 5",
        content: "Why was the developer unhappy at their job? They wanted arrays but got objects."
      }
    ];
    res.send(jokes);
});

// Start listening on port 3000 (or environment variable PORT)
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
