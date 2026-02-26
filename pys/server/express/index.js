const express=require('express');
const app=express();

app.get('/',(req,res)=>{    
    return res.send('hello from home');
});
app.get('/about',(req,res)=>{
return res.send('hello from about ' + 'hey ' + req.query.name + req.query.age);

})
app.listen(4000,()=>{
    console.log('server is running at http://localhost:4000');
});