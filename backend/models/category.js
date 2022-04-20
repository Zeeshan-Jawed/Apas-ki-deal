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

export default mongoose.models.category || mongoose.model("Category", category_schema)