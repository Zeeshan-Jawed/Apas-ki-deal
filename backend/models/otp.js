
            const mongoose = require("mongoose");

            const userSchema = new mongoose.Schema({
            user_number: {
                type: Number
            },
            otp_code:
            {
                type: String
            },
            expireIn:
            {
                type: Number
            },
            is_verified:
            {
                type: Boolean
            },



            //timestamps: true,

        }
    );

 //creating collection
const otp = new mongoose.model('otp', userSchema)

//export collection
module.exports = { otp };

