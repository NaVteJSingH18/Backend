/**
 * Notes Application (File-Based CRUD + EJS)
 * 
 * Demonstrates:
 * 1. Setting up template rendering using EJS view engine.
 * 2. Serving static assets (CSS, JS) using `express.static(...)`.
 * 3. File system CRUD operations using Node's native 'fs' module.
 * 4. Resolving robust paths using `path.join(__dirname, ...)` to ensure process path independence.
 * 5. Parsing request body inputs.
 */

const express = require('express');
const app = express();
const path = require("path");
const fs = require("fs");
const PORT = 8000;

// Body parser middlewares to receive POST request data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure express to look into current directory's 'public' folder for static files
app.use(express.static(path.join(__dirname, "public")));

// Configure view engine to use EJS (Embedded JavaScript templates)
app.set("view engine", "ejs");

// Resolve the directory where notes will be written to/read from
const filesDir = path.join(__dirname, 'files');

// Ensure the 'files' folder exists so the app doesn't crash on initial launch
if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir);
}

// 1. Read All Notes: Read notes directory and render index page
app.get('/', (req, res) => {
    fs.readdir(filesDir, (err, files) => {
        if (err) {
            res.status(500).send("Error reading files directory");
        } else {
            res.render('index', { files: files });
        }
    });
});

// 2. Read Single Note Details: Reads specific file content and renders details page
app.get('/file/:filename', (req, res) => {
    const filePath = path.join(filesDir, req.params.filename);
    fs.readFile(filePath, "utf-8", (err, filedata) => {
        if (err) {
            return res.status(404).send("File not found");
        }
        res.render('show', { filename: req.params.filename, filedata: filedata });
    });
});

// 3. Edit Route (GET): Renders editing page for a specific note name
app.get('/edit/:filename', (req, res) => {
    res.render('edit', { filename: req.params.filename });
});

// 4. Edit Route (POST): Renames note file name
app.post('/edit', (req, res) => {
    const oldPath = path.join(filesDir, req.body.previous);
    const newPath = path.join(filesDir, req.body.new);

    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            console.error("Failed to rename note file:", err);
        }
        res.redirect('/');
    });
});

// 5. Create Note Route (POST): Creates a text note file with sanitized name
app.post('/create', (req, res) => {
    // Sanitize title by removing spaces (e.g. "My Note" -> "MyNote.txt")
    const filename = `${req.body.title.split(' ').join('')}.txt`;
    const filePath = path.join(filesDir, filename);

    fs.writeFile(filePath, req.body.details, (err) => {
        if (err) {
            console.error("Error creating note file:", err);
        }
        res.redirect('/');
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Notes app listening at http://localhost:${PORT}`);
});