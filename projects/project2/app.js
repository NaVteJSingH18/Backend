const express= require("express")
const mongoose=require("mongoose")
const path=require("path");
const app=express();

const userModel=require("./models/user")

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")))
app.get('/',(req,res)=>{
    res.render('index.ejs')
})

app.get('/read', async (req,res)=>{

    let users= await userModel.find();

    res.render('read', {users})
})
app.get('/create',(req,res)=>{
    res.redirect('/')
})
app.get('/delete/:id', async (req,res)=>{
    await userModel.findByIdAndDelete(req.params.id)
    res.redirect('/read')
})

app.get('/edit/:id', async (req,res)=>{
    let user=await userModel.findOne({_id: req.params.id})
    res.render('edit',{user})
})


app.post('/update/:id', async (req,res)=>{
    let {name,email,image}=req.body;
    let user=await userModel.findOneAndUpdate({_id: req.params.id},{image,name,email},{new:true})
    res.redirect('/read')
})

app.post('/create', async (req,res)=>{
    let {name,email,image}=req.body
  let createduser = await userModel.create({
        name,
        image,
        email
    })
res.redirect('/read')
})



app.listen(9000,()=>{
    console.log("server is runnging rn")
})