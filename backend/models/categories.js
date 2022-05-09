const mongoose = require('mongoose');

//creating schema of category
const category_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true

    },
    isActive: {
        type: Boolean,
        default: true
    },
    parent_Id: {
        type: Array,

    },
    image: {
        type: String
    }

})

//creating collection
const Category = new mongoose.model('categories', category_schema)


//export collection
module.exports = { Category };