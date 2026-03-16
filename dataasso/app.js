const express = require("express")
const mongoose =require("mongoose")
const app =express();
const userModel =require("./models/user")
const postModel = require("./models/post");


app.get("/",(req,res)=>{
    res.send("hi")
})

app.get("/create" , async (req,res)=>{
    let user = await userModel.create({
        username:"navtej",
        email:"navtej@gmail.com",
        age:21
    })
    res.send(user)
})

app.get("/post/create" , async (req,res)=>{
   let post = await postModel.create({
        postdata:"seedhe maut jal aur jeevan dono",
        user:"69b304da089c18ec4ee927d8",
    })
   let user= await userModel.findOne({_id:"69b304da089c18ec4ee927d8"});
    user.posts.push(post._id);
    await user.save();
    res.send({post,user});
})
app.listen(8000, ()=>{"hey This is port 8000"})