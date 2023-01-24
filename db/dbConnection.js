const mongoose = require("mongoose");

const DBConnect = ()=>{
    try {
        mongoose.set("strictQuery", false);
        mongoose
        .connect(process.env.DATABASE_CONNECTION)
        .catch((e)=> console.log(e))
        console.log("Database Connected")
    } catch (error) {
        console.log(error);
    }
}

module.exports = DBConnect;