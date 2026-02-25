const express = require("express");
const db=require("./db");
const mongoose=require("mongoose");
const app = express();
const PORT = 3000;
app.use(express.json());
const userSchema=new mongoose.Schema({
  firstName:{
    type:String,
    required:true,
  },
  lastName:{
    type:String
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  jobTitle:{
    type:String,
  },
  gender:{
    type:String
  }
})
const User=mongoose.model('User',userSchema)

const users = require("./data.json");
const path = require("path");
const filePath = path.join(__dirname, "data.json");
const fs=require('fs');
//middleware to parse urlencoded data
app.use(express.urlencoded({extended:false}))
const logFilePath = path.join(__dirname, 'logs.txt');
app.use((req,res,next)=>{
  fs.appendFile(logFilePath,`${Date.now()}:${req.ip}:${req.method}:${req.path}\n`,(err,data)=>{
  next();
  })
});

app.use((req,res,next)=>{
  console.log("middleware executed");
  next();
})

app.use((req,res,next)=>{
  console.log("middleware 2 executed");
  
next();
})
app.get("/", (req, res) => {

 return res.send("hello world from express");
});

app
  .route("/api/users/:id")
  .get( (req, res) => {
    
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .put( (req, res) => {
    res.json({ status: "pending" });
  })
  .patch( (req, res) => {
    res.json({ status: "pending" });
  })
  .delete( (req, res) => {
    res.json({ status: "pending" });
  });

app.get("/api/users", (req, res) => {
  res.setHeader('X-Myname','Navtej')
  return res.json(users);
});
app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users
      .map(
        (user) => `<li>
        ${user.first_name}      
        </li>`,
      )
      .join("")}
    </ul>
    `;
  res.send(html);
});

app.post('/api/users',async (req,res)=>{ 
  const body=req.body;
if(!body||
  !body.first_name||
  !body.last_name||
  !body.email||
  !body.gender||
  !body.jobTitle
){
  return res.status(400).json({msg:"All fields are req..."})
}

const result=
await User.create({
  firstName:body.first_name,
  lastName:body.last_name,
  email:body.email ,
  gender:body.gender,
  jobTitle:body.job_title
});
console.log("result",result)
return res.status(201).json({msg:"success"});
    

    //not when use mongo db only for fake data
//  users.push({...body,id: users.length+1}); 

//     fs.writeFile(filePath,JSON.stringify(users), (err,data)=>{
//        if (err) return res.status(500).json({ status: 'error' });
//         return res.json({status:'success',id: users.length})
//  })
})

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
