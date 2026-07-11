/**
 * Mongoose Owner Model (E-Commerce App)
 * 
 * Defines schema representing platform shop owners/administrators.
 */

const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
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
    // Array to hold products owned by the seller
    products: {
        type: Array,
        default: []
    },
    picture: {
        type: String
    },
    gstin: String, // GST Identification Number for taxes
});

module.exports = mongoose.model("owner", ownerSchema);