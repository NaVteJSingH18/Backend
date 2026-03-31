const express= require("express")
const router = express.Router()

const ownerModel = require("../models/owner-model")

router.get('/',(req,res)=>{
    res.send("done")
});

router.post("/create",async(req,res)=>{
   let owners =  await ownerModel.find()
   if(owners.length>0){
    res
    .status(500)
    .send("you dont have permission to create owner")
   }

   let {fullname,email,password}= req.body
   let createdOwner =await ownerModel.create({
    fullname,
    email,
    password
   });
   res.status(201).send("owner created")

})

module.exports = router;

