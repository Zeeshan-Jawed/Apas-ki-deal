const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    
    user_number: {
        type: Number,
    }, 
    opt_code :{
       type: Number
    },
    expireIn :
    { 
        type : Number
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
    
       // default: 'customer',
       // enum: ["customer", "admin", "root", 'seller']
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
    isDelete: {
        type: Boolean,
        default: false
    }
});

//creating collection
const users = new mongoose.model('users', userSchema , "users" )



//export collection
module.exports = { users };



