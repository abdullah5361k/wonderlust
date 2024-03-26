const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
        // await mongoose.connect('mongodb://localhost/airbnb');
        console.log("Connection successfull")
    } catch (error) {
        console.log("Db Error ", error)
        process.exit(1);
    }
}

module.exports = dbConnection;