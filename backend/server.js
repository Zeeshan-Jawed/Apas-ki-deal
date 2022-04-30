const express = require('express');
require('./config/connectDb');
const bodyparser = require('body-parser');
 PORT = process.env.PORT || 3002
 //const ads_router = require('./routes/ads.routes')
 const fav_router = require('./routes/favourites.routes')
const user_router = require('./routes/user.route');
const adv_router = require('./routes/advertise.route');
const category_router = require('./routes/category.route');
const notification_router = require('./routes/notification.routes');
require('dotenv').config()
const app = express();
app.use(bodyparser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: false
}));
app.use(express.json());
app.use([user_router, adv_router, category_router, notification_router  , fav_router])


// connectDb()
app.listen(PORT, () => {
    console.log(`server is start ${PORT}`)
})