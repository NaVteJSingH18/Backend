const express= require("express");
const userModel = require("../models/user-model");
const {registerUser} = require("../controller/authController")

const router = express.Router()
const {loginUser} = require("../controller/authController")
    
router.get('/',(req,res)=>{
    res.send("done")
});

router.post("/register",registerUser)

router.post("/login",loginUser)

module.exports = router;
