/**
 * Mongoose Product Model (E-Commerce App)
 * 
 * Defines schema representing inventory products, listing pricing details,
 * design colors (background, text, panel), and related orders.
 */

const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    bgcolor: {
        type: String,
    },
    textcolor: {
        type: String,
    },
    panelcolor: {
        type: String,
    },
    // Fixed bug: merged duplicate price field definitions into a single clean declaration
    price: {
        type: Number,
        required: true,
        default: 0
    },
    orders: {
        type: Array,
        default: []
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model("product", productSchema);