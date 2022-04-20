const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types;

//creating schema of advertise
const advertise_schema = new mongoose.Schema({

    user_Id: {
        type: ObjectId,
        ref: "User"
    },
    ads_Detail_Id: {
        type: ObjectId,
        ref: "Ads_Deatil"
    },
    category_Id: {
        type: ObjectId,
        ref: "Category"
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    images: {
        type: Array,
        required: true,
        pool: {
            min: 1,
            max: 10
        }
    },
    posted_On: {
        type: Date,
        required: true
    },
    updated_On: {
        type: Date,
        required: true
    },
    is_Active: {
        type: Boolean,
        required: true
    },
    deleted_On: {
        type: Date,
        required: true
    },
    is_Deleted: {
        type: Boolean,
        required: true
    }


})

export default mongoose.models.advertise || mongoose.model("Advertise", advertise_schema)