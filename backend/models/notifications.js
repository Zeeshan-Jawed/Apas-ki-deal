const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating schema of notification
const notification_schema = new mongoose.Schema({
    receive_Date: {
        type: Date,
        required: true,
        trim: true
    },
    seen_Date: {
        type: Date,
        required: true,
        trim: true
    },
    image: {
        type: String,
    },
    // },
    // user_Id: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'

    // },
    content: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
    },
    link_Seen_Date: {
        type: Date,
    }

})

//creating collection
const Notification = new mongoose.model('notifications', notification_schema)


//export collection
module.exports = { Notification };