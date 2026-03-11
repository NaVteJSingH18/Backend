const express= require('express');

const app =express();

const jwt=require("jsonwebtoken")
const cookieParser=require('cookie-parser')
app.use(cookieParser());
const userModel=require("./models/user")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const bcrypt =require("bcrypt")

app.get("/",(req,res)=>{
    res.send("home")
})

app.post("/create", (req,res)=>{
    let {username , email , password , age}=req.body

    bcrypt.genSalt(10,  (err,salt)=>{
        bcrypt.hash(password , salt, async (err,hash)=>{
        let createdUser= await userModel.create({
    username,
    email,
    password:hash,
    age
})
    let token = jwt.sign({email},"shhhhhhhh");
    res.cookie("token",token)

res.send(createdUser)
})
})
    })
app.post("/login",async (req,res)=>{
    let user = await userModel.findOne({email:req.body.email})
if(!user) return res.send("something went wrong")
        bcrypt.compare(req.body.password,user.password,(err,result)=>{
            if(result){
                let token = jwt.sign({email:user.email},"shhhhhhhh");
    res.cookie("token",token)
res.send("yes you can login")        }else("something is wrong")

        })
})
app.post('/logout',(req,res)=>{
    res.cookie("token","");
    res.redirect("/")
})


app.listen(8000);