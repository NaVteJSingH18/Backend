const express = require("express")

const cookieParser=require("cookie-parser")

const ownersRouter = require("./routes/ownersRouter")
const productsRouter= require("./routes/productsRouter")
const usersRouter = require("./routes/usersRouter")

const connection = require("./config/mongoose-connection")

require("dotenv").config();

const app = express()

app.use(cookieParser());


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/owners",ownersRouter)

app.use("/users",usersRouter)

app.use("/products",productsRouter)

app.get('/',(req,res)=>{
    res.send("home")
})
const port=5555;
const server= app.listen(port,()=>{
    console.log("connected");
})
server.on("error",(error)=>{
    console.log(error)
})          