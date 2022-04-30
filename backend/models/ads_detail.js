const mongoose = require('mongoose');

//creating schema of ads detail
const ads_detail_schema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    value: {
        type: String,
        required: true,
        trim: true
    }

})

export default mongoose.models.ads_detail || mongoose.model("Ads_Deatil", ads_detail_schema)