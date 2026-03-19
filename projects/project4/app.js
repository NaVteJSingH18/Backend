const express =require("express")
const app =express();

const userModel=require("./models/user")
const postModel=require("./models/post")
const cookieParser =require("cookie-parser")
const bcrypt=require('bcrypt');
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
  

app.get('/login',(req,res)=>{
    res.send("login")
})

app.get('/profile',isLoggedIn, async (req,res)=>{
   let user =await userModel.findOne({email:req.user.email}).populate("posts")
    
res.json({ message: "welcome to profile", user });
})

app.post('/post',isLoggedIn, async (req,res)=>{
   let user =await userModel.findOne({email:req.user.email})
     let {content} = req.body
 let post = await postModel.create({
    
    user:user._id,
    content
});

user.posts.push(post._id)
await user.save()
res.send("Post created successfully");  
})

app.post('/register', async (req,res)=>{
    let {email,username,name,password,age }= req.body;
    let user = await  userModel.findOne({email})         
    if (user) return res.status(400).send("user already registered")        
        
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt, async (err,hash)=>{
               let user = await  userModel.create({
                    username,
                    email,
                    age,
                    name,
                    password:hash
                });
                let token =  jwt.sign({email:email,userid:user._id },"shhhh")
                res.cookie("token",token)
                res.send("registered")
            })
        })
})

app.post('/login', async (req,res)=>{
    let {email,password}= req.body;
    let user = await  userModel.findOne({email})         
    if (!user) return res.status(500).send("something went wrong") 
               
    
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result) {
                
                let token =  jwt.sign({email:email,userid:user._id },"shhhh")
                res.cookie("token",token)
                res.status(200).send("you can login")
            }
                else res.redirect("/login")
        })     

})

app.get("/logout",(req,res)=>{
    res.clearCookie("token");
    res.redirect("/login")
})

function isLoggedIn(req, res, next) {
    if (!req.cookies.token) {
        return res.send("you must be logged in");
    }

    try {
        let data = jwt.verify(req.cookies.token, "shhhh");
        req.user = data;
        next();
    } catch (err) {
        return res.send("invalid token");
    }
}

app.listen(3000)