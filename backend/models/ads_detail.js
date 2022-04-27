const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating schema of ads detail
const ads_detail_schema = new mongoose.Schema({

    advertise_id: {
        type: Schema.Types.ObjectId,
        ref: "advertises"
    },
    namekey: {
        type: String
    },
    valuead: {
        type: String
    }

})

//creating collection
const advertise_detail = new mongoose.model('advertise_detail', ads_detail_schema)

//export collection
module.exports = { advertise_detail };