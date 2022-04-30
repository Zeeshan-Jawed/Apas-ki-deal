const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types;

//creating schema of favourite
const favourite_schema = new mongoose.Schema({
      fav_id :{
 type: Number
      },
    user_Id: {
        type: Number,
        //ref: "User"
    },
    ad_Id: {
        type: Number,
        //ref: "Advertise"
    }

})


const Favourite = new mongoose.model('Favourite', favourite_schema)


//export collection
module.exports = { Favourite };

