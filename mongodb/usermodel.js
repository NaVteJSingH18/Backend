const mongoose=require("mongoose")
mongoose.connect(`mongodb://127.0.0.1:27017/mongopractice`)
    .catch(err => console.error("MongoDB connection error:", err));

const userSchema=mongoose.Schema({
    name:String,
    username:String,
    email:String,
})

module.exports =  mongoose.model("user",userSchema);


 