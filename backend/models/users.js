const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phoneno: {
        required: true,
        type: String,
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
        select: false
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
        enum: ["customer", "admin", "root", 'seller']
    },
    created_on: {
        type: Date
    },
    updated_on: {
        type: Date
    },
    deleted_on: {
        type: Date
    },
    image: {
        type: String
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

//creating collection
const users = new mongoose.model('users', userSchema)

//export collection
module.exports = { users };