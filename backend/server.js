const express = require('express');
require('./config/connectDb');
const bodyparser = require('body-parser');
const PORT = process.env.PORT || 3002
const user_router = require('./routes/user.route');
const adv_router = require('./routes/advertise.route');
const category_router = require('./routes/category.route');
const notification_router = require('./routes/notification.routes');
const app = express();
app.use(bodyparser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: false
}));
app.use(express.json());
app.use([user_router, adv_router, category_router, notification_router])


// connectDb()
app.listen(PORT, () => {
    console.log(`server is start ${PORT}`)
})