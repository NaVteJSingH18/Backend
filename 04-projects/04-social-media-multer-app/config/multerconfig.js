/**
 * Multer File Upload Configuration
 * 
 * Configures disk storage for file uploads:
 * 1. Resolves absolute destination paths robustly.
 * 2. Generates unique secure filenames using crypto random bytes.
 * 3. Automatically handles destination directory initialization to prevent server-side crashes.
 */

const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

// Resolve upload folder path absolute position
const uploadDir = path.join(__dirname, '..', 'public', 'images', 'uploads');

// Ensure upload directory exists before starting storage engine
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up disk storage engine details
const storage = multer.diskStorage({
  // Define upload destination folder
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  // Define custom file renaming strategy
  filename: function (req, file, cb) {
    try {
        // Generate 12 random bytes synchronously to construct a secure, unique filename
        const randomHex = crypto.randomBytes(12).toString("hex");
        const fileExtension = path.extname(file.originalname);
        const finalFilename = `${randomHex}${fileExtension}`;
        
        cb(null, finalFilename);
    } catch (err) {
        // Fallback filename strategy in case of random byte generation failure
        const fallbackName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, fallbackName);
    }
  }
});

// Initialize configured multer upload instance
const upload = multer({ storage: storage });

module.exports = upload;