const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var moment = require("moment");

//creating schema of advertise
const advertise_schema = new mongoose.Schema({

    user_Id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    // ads_Detail_Id: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Ads_Detail"
    // },
    category_Id: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    title: {
        type: String,
        // required: true,
        // trim: true
    },
    price: {
        type: String,
        // required: true,
        // trim: true
    },
    description: {
        type: String,
        // required: true,
        //trim: true
    },
    location: {
        type: String,
        // trim: true
    },
    images: {
        type: String,
        //required: true
    },
    condition: {
        type: String
    },
    local_area: {
        type: String
    },
    posted_On: {
        default: moment().format("YYYY-MM-DD HH:mm:ss"),
        type: Date
    },
    updated_On: {
        type: Date,
    },
    is_Active: {
        type: Boolean,
        //required: true
    },
    deleted_On: {
        type: Date,
    },
    is_Deleted: {
        type: Boolean,
        default: false
        // required: true
    },


})

//creating collection
const advertise = new mongoose.model('advertises', advertise_schema)


//export collection
module.exports = { advertise };