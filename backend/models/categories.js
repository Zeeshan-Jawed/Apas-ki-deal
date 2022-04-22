const mongoose = require('mongoose');

//creating schema of category
const category_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        required: true,
        trim: true
    },
    parent_Id: {
        type: Array,
        trim: true
    },
    created_On: {
        type: Date,
        required: true,
        trim: true
    },
    image: {
        type: String
    }

})

//creating collection
const Category = new mongoose.model('categories', category_schema)


//export collection
module.exports = { Category };