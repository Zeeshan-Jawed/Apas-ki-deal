const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types;

//creating schema of views
const views_schema = new mongoose.Schema({

    ad_Id: {
        type: ObjectId,
        ref: "Advertise"
    },
    ip_Address: {
        type: String,
        required: true,
    },
    user_Agent: {
        type: String,
        required: true,
        
    }

})

export default mongoose.models.views || mongoose.model("View", views_schema)