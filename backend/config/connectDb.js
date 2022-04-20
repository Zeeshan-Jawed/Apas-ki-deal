const mongoose = require("mongoose");
const connection = {}
const connectDb =  () => {
    if (connection.isConnected) {
        // Using existing database connection
        console.log("Using existing connection")
        return;
    }
    //Use new database connection
    const url='mongodb://localhost:27017/apaskideal'
     mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = mongoose.connection
    db.once('open', _ => {
        console.log('Database connected:', url)
        // connection.isConnected = db.connections[0].isReadyState;
    })

    db.on('error', err => {
        console.error('connection error:', err)
    })
}


module.exports = connectDb;
