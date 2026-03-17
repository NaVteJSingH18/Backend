const express =require("express")
const app =express();

const userModel=require("./models/user")

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
  
app.get('/',(req,res)=>{
    res.send("home")

})

app.get('/register',(req,res)=>{
    let {email,username,name,password,post}= req.body
    let user :                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          userModel.findOne({ email})
})

