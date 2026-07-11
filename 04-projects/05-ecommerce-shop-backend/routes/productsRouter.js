/**
 * Products Router (E-Commerce App)
 * 
 * Exposes endpoints to search, create, and filter inventory products.
 */

const express = require("express");
const router = express.Router();

// GET all products listing (mock)
router.get('/', (req, res) => {
    res.send("done");
});

module.exports = router;
