/**
 * Users REST API and HTML Server
 * 
 * Practicing key backend concepts:
 * 1. Express Middleware chain execution and request logging to file.
 * 2. Route grouping using `app.route(...)` to support clean HTTP verbs (GET, PUT, PATCH, DELETE).
 * 3. Setting custom response headers (`X-Myname`).
 * 4. Serving HTML dynamically vs REST JSON API.
 * 5. MongoDB CRUD creation (active) alongside local file-based database backups (commented/inactive).
 */

const express = require("express");
const db = require("./db"); // Import database connection logic
const mongoose = require("mongoose");
const fs = require('fs');
const path = require("path");

const app = express();
const PORT = 3000;

// Resolve paths for local file database and log files
const filePath = path.join(__dirname, "data.json");
const logFilePath = path.join(__dirname, 'logs.txt');

// Load mock users from the local JSON database (used for API reading routes)
const users = require("./data.json");

// Define Mongoose User schema and model for database CRUD operations
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String
  }
});
const User = mongoose.model('User', userSchema);

// ==========================================
// Middleware Configuration
// ==========================================

// Parse incoming request bodies (JSON format)
app.use(express.json());

// Parse incoming request bodies (URL-encoded format)
app.use(express.urlencoded({ extended: false }));

// Custom Logging Middleware: logs request details (timestamp, IP, method, path) into logs.txt
app.use((req, res, next) => {
  fs.appendFile(logFilePath, `${Date.now()}:${req.ip}:${req.method}:${req.path}\n`, (err) => {
    if (err) {
      console.error("Failed to write access log:", err);
    }
    next(); // Pass control to the next middleware function
  });
});

// Demo Middleware 1
app.use((req, res, next) => {
  console.log("Middleware 1 executed");
  next();
});

// Demo Middleware 2
app.use((req, res, next) => {
  console.log("Middleware 2 executed");
  next();
});

// ==========================================
// Route Declarations
// ==========================================

// Root route
app.get("/", (req, res) => {
  return res.send("hello world from express");
});

// Grouped routes for a single user by ID path: `/api/users/:id`
app.route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  })
  .put((req, res) => {
    // PUT: Replace a resource entirely (mock response)
    res.json({ status: "pending", method: "PUT" });
  })
  .patch((req, res) => {
    // PATCH: Partially update a resource (mock response)
    res.json({ status: "pending", method: "PATCH" });
  })
  .delete((req, res) => {
    // DELETE: Delete a resource (mock response)
    res.json({ status: "pending", method: "DELETE" });
  });

// GET all users as JSON
app.get("/api/users", (req, res) => {
  // Set custom developer response header
  res.setHeader('X-Myname', 'Navtej');
  return res.json(users);
});

// GET all users rendered as an HTML list (Server-Side Rendering demo)
app.get("/users", (req, res) => {
  const html = `
    <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
  `;
  res.send(html);
});

// POST to create a user inside MongoDB database
app.post('/api/users', async (req, res) => { 
  const body = req.body;

  // Validation: ensure required parameters are present in request body
  if (!body ||
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender ||
      !body.jobTitle
  ) {
    return res.status(400).json({ msg: "All fields are required..." });
  }

  try {
    // Insert new user into MongoDB database
    const result = await User.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
      jobTitle: body.jobTitle
    });

    console.log("Created user in MongoDB database:", result);
    return res.status(201).json({ msg: "success", id: result._id });
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({ error: err.message });
  }

  // --- LOCAL JSON FILE FALLBACK (Inactive) ---
  // users.push({...body, id: users.length + 1}); 
  // fs.writeFile(filePath, JSON.stringify(users), (err, data) => {
  //    if (err) return res.status(500).json({ status: 'error' });
  //    return res.json({ status: 'success', id: users.length })
  // })
});

// Start express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
