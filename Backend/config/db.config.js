const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connection successfull")
    } catch (error) {
        console.log("Db Error ", error)
        process.exit(1);
    }
}

module.exports = dbConnection;