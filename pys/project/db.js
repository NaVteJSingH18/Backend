const  mongoose =require("mongoose");
require("dotenv").config();
mongoose.connect(`${process.env.MONGO_URI}/youtube-app-1`)
.then(()=>{
    console.log("Connected to Cluster0")
})
.catch((err)=>{
    console.log(err)
})