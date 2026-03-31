const jwt = require("jsonwebtoken")

  const generateToken = (user)=>{
    return jwt.sign({email:user.email,id:user._id},process.env.JWT_KEY)
}
  
  
  // creating token of email of user and id of user  with secret key which will later on be decoded on the basis of key and will give us the email and id of user
  
  
  module.exports.generateToken=generateToken;