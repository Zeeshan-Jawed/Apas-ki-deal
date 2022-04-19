const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneno: {
        type: Number
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: false,
        default: ''
    },
    city: {
        type: String,
        required: false,
        default: ''
    },
    state: {
        type: String,
        required: false,
        default: ''
    },
    zipCode: {
        type: String,
        required: false,
        default: ''
    },
    role: {
        type: String,
        required: true,
        default: 'customer',
        enum: ["customer", "admin", "root"]
    },
    created_on:{
        type: Date
    },
    updated_on:{
        type: Date
    },
    deleted_on:{
        type: Date
    },
    isDelete:{
        type: Boolean,
        default: false
    }
});

const users = new mongoose.model("users",userSchema);


module.exports = users;