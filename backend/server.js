const express =require('express');
const connectDb = require('./config/connectDb');
const ad_router = require('./routes/ad.route');
const user_router = require('./routes/user.route');

const app=express();
app.use(express.json());
app.use([user_router,ad_router])

const port=8030
connectDb()
app.listen(port,()=>{
    console.log(`server is start ${port}`)
})