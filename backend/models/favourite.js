const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types;

//creating schema of favourite
const favourite_schema = new mongoose.Schema({

    user_Id: {
        type: ObjectId,
        ref: "User"
    },
    ad_Id: {
        type: ObjectId,
        ref: "Advertise"
    }

})

export default mongoose.models.favourite || mongoose.model("Favourite", favourite_schema)