import express from 'express';
const app = express();
app.get('/',(req,res)=>{
    res.send('srver is ready')
});
app.get('/api/jokes',(req,res)=>{
    const jokes=[
  {
    id: 1,
    title: "Joke 1",
    content: "Why don’t programmers like nature? Too many bugs."
  },
  {
    id: 2,
    title: "Joke 2",
    content: "Why did the JavaScript developer go broke? Because he kept using console.log."
  },
  {
    id: 3,
    title: "Joke 3",
    content: "Why do programmers prefer dark mode? Because light attracts bugs."
  },
  {
    id: 4,
    title: "Joke 4",
    content: "How many programmers does it take to change a light bulb? None. It’s a hardware problem."
  },
  {
    id: 5,
    title: "Joke 5",
    content: "Why was the developer unhappy at their job? They wanted arrays but got objects."
  }
];
res.send(jokes)
});

const port =process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`server at  http://localhost:${port}`);
});
