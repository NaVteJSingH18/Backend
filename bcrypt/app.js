const express = require("express")
const app = express();
const cookieParser = require("cookie-parser")
const bcrypt=require('bcrypt');

app.use(cookieParser());

const jwt = require("jsonwebtoken");
app.get('/',(req,res)=>{
  let token =  jwt.sign({email:"dead@pool.com"},"secret")
 
    res.cookie('token',token)
    console.log(token)
    res.send('home')
})

// app.get('/',(req,res)=>{
//     bcrypt.compare('46639',"$2b$10$3l8jzGsghl3anapudu7k9OPPNJCOHwjr5l4ZCzszsFBdvYyvJ6zFq", function(err, result) {
//     console.log(result)
// });
// res.send('pass')
// })

// app.get('/',(req,res)=>{
//     bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash("46639", salt, function(err, hash) {
//         console.log(hash)
//     });
// });
// res.send('home')
// })

// app.get('/',(req,res)=>{
//     res.cookie('name','navtej')
//     res.send('home')
// })
// app.get('/read',(req,res)=>{
//     console.log(req.cookies)
//     res.send("read page")
// })


app.listen(8000)