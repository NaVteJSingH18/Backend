const mongoose=require("mongoose")


const productSchema= mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    bgcolor:{
        type:String,
    },
    textcolor:{
        type:String,
    },
    panelcolor:{
        type:String,
    },
    price:{
        type:Number,
        default:0
    },
    orders:{
        type:Array,
        default:[]
    },
    price:{
        type:Number
    },
    image:{
        type:String
    }
})

module.exports=mongoose.model("product",productSchema)