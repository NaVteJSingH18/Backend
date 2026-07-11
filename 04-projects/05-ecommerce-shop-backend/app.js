/**
 * Modular E-Commerce Backend Application
 * 
 * Demonstrates clean router separation (Owners, Users, Products), 
 * controller pattern implementation, database connection middleware integration,
 * cookie parsing, and structured environment variable loading.
 */

require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const cookieParser = require("cookie-parser");

// Import Database Connection (Establishes Mongoose Connection immediately)
const connection = require("./config/mongoose-connection");

// Import Routers
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");

const app = express();
const port = process.env.PORT || 5555;

// Middleware to parse cookies
app.use(cookieParser());

// Middlewares to parse request bodies (JSON and Form Data)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Bind sub-routers to specific parent paths
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// Homepage test route
app.get('/', (req, res) => {
    res.send("home");
});

// Start the server
const server = app.listen(port, () => {
    console.log(`E-Commerce Backend server running on port ${port}`);
});

// Handle server connection/runtime errors
server.on("error", (error) => {
    console.error("Server error encountered:", error);
});