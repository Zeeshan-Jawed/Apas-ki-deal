const express = require('express');
require('./config/connectDb');
const PORT = process.env.PORT || 3002
const ad_router = require('./routes/ad.route');
const user_router = require('./routes/user.route');
const category_router = require('./routes/category.route');
const notification_router = require('./routes/notification.routes');

const app = express();
app.use(express.json());
app.use([user_router, ad_router, category_router, notification_router])


// connectDb()
app.listen(PORT, () => {
    console.log(`server is start ${PORT}`)
})