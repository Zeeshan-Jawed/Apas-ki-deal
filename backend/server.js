const express =require('express');
const connectDb = require('./config/connectDb');

const app=express();
app.use(express.json());

const port=8030
connectDb()
app.listen(port,()=>{
    console.log(`server is start ${port}`)
})