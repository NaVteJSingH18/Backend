const express=require("express")

const mongoose=require("mongoose")
const userModel= require('./usermodel')
const app=express();

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('this is home page')
})

app.get('/create', async (req,res)=>{
    let createduser= await userModel.create({
    name:'navtej',
    email:"navtej@gmail.com",
    username:"navtej"   
})
res.send(createduser);
})
app.get('/update', async (req,res)=>{
   let updateduser = await userModel.findOneAndUpdate(
       { username:"navtej" },
       { name:"navi", email:"navi@gmail.com" },
       { returnDocument:"after" }
   )

   console.log(updateduser)
   res.send(updateduser);
})

app.get('/read',async (req,res)=>{
    let users=  await userModel.find();
    res.send(users)
})

app.get('/delete',async (req,res)=>{
    let users=  await userModel.findOneAndDelete(
        {username:"navtej"}
    );
    res.send(users)
})

app.listen(8000,()=>{
    console.log("server is running rn")
})