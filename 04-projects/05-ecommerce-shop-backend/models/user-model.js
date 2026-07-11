/**
 * Mongoose User Model (E-Commerce App)
 * 
 * Defines schema representing buyers/customers including cart array,
 * purchase orders, and admin status flag.
 */

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // Array holding items currently added to cart
    cart: {
        type: Array,
        default: []
    },
    // Admin access privileges flag
    isadmin: {
        type: Boolean,
        default: false
    },
    // Historical orders purchased by user
    orders: {
        type: Array,
        default: []
    },
    contact: {
        type: Number
    },
    picture: {
        type: String
    }
});

module.exports = mongoose.model("user", userSchema);