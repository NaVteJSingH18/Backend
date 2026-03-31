const express = require("express");
const userModel =require("../models/user-model")
const { generateToken } = require("../utils/generateToken");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

module.exports.registerUser = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(500).send("user already exist");
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (error, hash) => {
        if (error) {
          return res.status(500).send(error.message);
        } 
          const newuser = await userModel.create({
            fullname,
            email,
            password: hash,
          });
        
        let token = generateToken(newuser);
         res.cookie("token", token); // will store the token as a cookie on the user.s browser and whenever user will send request to the server  we can check the cookie for the token and verify it and then give access to the user according to that email and id which we have stored in the token
         return  res.send(newuser);
      });
    });

  } catch (error) {
    return res.send(error.message);
  }
};

module.exports.loginUser = async(req,res)=>{
  try{
    let {email,password}= req.body;
      let user= await userModel.findOne({email}) // find if user preexist
      if(!user) return res.status(404).send("User not found");
  
      bcrypt.compare(password,user.password,(err,result)=>{ // compare the user_given password with db_stored password
        if(!result) return res.status(400).send("Invalid credentials")
        
        let token = generateToken(user);
        res.cookie("token",token)
        res.status(200).send("login successfully")
      })
  }catch(error){
    return res.status(500).send({error: error.message})
  }
    }

