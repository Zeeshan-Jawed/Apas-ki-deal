const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://apas-ki-deal:computer123@apas-ki-deal.rz0zg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true
}).then(() => {
    console.log("Connection Successful")
}).catch((e) => {
    console.log(e)
})