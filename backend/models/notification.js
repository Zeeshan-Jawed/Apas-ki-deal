const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types;

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
    user_Id: {
        type: ObjectId,
        ref: "User"
    },
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

export default mongoose.models.notification || mongoose.model("Notifiction", notification_schema)