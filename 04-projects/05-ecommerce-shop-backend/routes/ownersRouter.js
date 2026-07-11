/**
 * Owner Routers (E-Commerce App)
 * 
 * Exposes endpoints to manage shop owners.
 * Restricts owner creation to only allow a single owner account when practicing locally.
 */

const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

// GET owners test route
router.get('/', (req, res) => {
    res.send("done");
});

// POST create shop owner (Limited to a maximum of 1 owner document for practice/security)
router.post("/create", async (req, res) => {
   try {
       let owners = await ownerModel.find();
       
       // Reject creation if an owner already exists
       if (owners.length > 0) {
           return res.status(403).send("You do not have permission to create an owner (One already exists)");
       }

       let { fullname, email, password } = req.body;
       
       let createdOwner = await ownerModel.create({
           fullname,
           email,
           password
       });
       
       res.status(201).send({ message: "Owner created successfully", owner: createdOwner });
   } catch (err) {
       res.status(500).send("Owner creation failed: " + err.message);
   }
});

module.exports = router;
