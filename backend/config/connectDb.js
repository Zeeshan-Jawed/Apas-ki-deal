const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://admin:0gttYxEnNwLDm5MA@cluster0.w1hxk.mongodb.net/apaskideals?retryWrites=true&w=majority', {
    useNewUrlParser: true
}).then(() => {
    console.log("Connection Successful")
}).catch((e) => {
    console.log(e)
})