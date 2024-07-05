const mongoose = require('mongoose')
const ServerConfig = require('./ServerConfig')
// helps us to connect to mongo DB server
async function connectDB(){
    console.log("hello");
    try{    
        await mongoose.connect(ServerConfig.DB_URL);
        console.log("Successfully connected to mongo DB server.....")

    }
    catch(error){
        console.log("not able to connect to mongo db");
        console.log(error);
    }
}


module.exports = connectDB;