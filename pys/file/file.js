const fs = require('fs');

//file sync( blocking code) 
// fs.writeFileSync('./pys/file/file.txt',"this is done by writeFileSync");

//file async (non blocking code ) always use non blocking code 
// fs.writeFile('./pys/file/file.txt','this is done by writefile',(err)=>{
//     if(err){
//         console.log(err);
//     }
// } 


//read by sync
// const result=fs.readFileSync('./pys/file/file.txt','utf-8')
// console.log(result);

// read file by async

// fs.readFile('./pys/file/file.txt','utf-8',(err,result)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(result);
//     }
// })

// fs.appendFileSync('./pys/file/file.txt',`this is appended text\n`)

//append by async
// fs.appendFile('./pys/file/file.txt',`this is appended but async  text\n`,(err)=>{
//     if(err){
//         console.log(err);
//     } })

fs.cpSync('./pys/file/file.txt','./pys/file/copyfile.txt')
fs.unlinkSync('./pys/file/copyfile.txt') 
console.log(fs.statSync('./pys/file/file.txt'))