const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types;

//creating schema of role
const role_schema = new mongoose.Schema({

    user_Id: {
        type: ObjectId,
        ref: "User"
    },
    type: {
        type: String,
        required: true,
        trim: true
    }

})

export default mongoose.models.role || mongoose.model("Role", role_schema)