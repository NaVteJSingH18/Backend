/**
 * Node.js File System (fs) Module Practice
 * 
 * This script demonstrates the differences between synchronous (blocking) and 
 * asynchronous (non-blocking) file system operations using Node's core 'fs' module.
 */

const fs = require('fs');
const path = require('path');

// Resolve the target text file path relative to this script's directory
const targetFilePath = path.join(__dirname, 'file.txt');
const copyFilePath = path.join(__dirname, 'copyfile.txt');

// ==========================================
// 1. File Writing Demonstration (Commented Out)
// ==========================================

/*
// Synchronous (Blocking) File Write
// This blocks execution until the file is written.
fs.writeFileSync(targetFilePath, "this is done by writeFileSync");

// Asynchronous (Non-Blocking) File Write
// Recommended approach: runs in the background and calls the callback when done.
fs.writeFile(targetFilePath, 'this is done by writefile', (err) => {
    if (err) {
        console.error("Error writing file:", err);
    } else {
        console.log("File written successfully!");
    }
});
*/

// ==========================================
// 2. File Reading Demonstration (Commented Out)
// ==========================================

/*
// Synchronous (Blocking) File Read
const result = fs.readFileSync(targetFilePath, 'utf-8');
console.log("Sync Read Result:", result);

// Asynchronous (Non-Blocking) File Read
fs.readFile(targetFilePath, 'utf-8', (err, result) => {
    if (err) {
        console.error("Error reading file:", err);
    } else {
        console.log("Async Read Result:", result);
    }
});
*/

// ==========================================
// 3. File Appending Demonstration (Commented Out)
// ==========================================

/*
// Synchronous File Append
fs.appendFileSync(targetFilePath, `this is appended text\n`);

// Asynchronous File Append
fs.appendFile(targetFilePath, `this is appended but async text\n`, (err) => {
    if (err) {
        console.error("Error appending file:", err);
    }
});
*/

// ==========================================
// 4. File Copy, Delete, and Metadata (Active Code)
// ==========================================

// Copy file.txt to copyfile.txt synchronously
fs.cpSync(targetFilePath, copyFilePath);
console.log("File copied successfully to:", copyFilePath);

// Delete/Unlink the copied file synchronously
fs.unlinkSync(copyFilePath);
console.log("Deleted copy file:", copyFilePath);

// Retrieve and log metadata stats for file.txt
const fileStats = fs.statSync(targetFilePath);
console.log("File Statistics:\n", fileStats);