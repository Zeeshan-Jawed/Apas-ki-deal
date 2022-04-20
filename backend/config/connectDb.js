const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/apas-ki-deal', {
    useNewUrlParser: true
}).then(() => {
    console.log("Connection Successful")
}).catch((e) => {
    console.log(e)
})