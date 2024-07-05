// to make change visible everytime something changes in server
// to automattically restart server
// use NODEMON
const express = require('express')
const ServerConfig = require('./config/ServerConfig');
const connectDB = require('./config/DbConfig');


const app = express();

// app.use () -> applies body parser in application


// to parse/read the data from input successfully
// we also need to parse


// for json input
app.use(express.json());
// for text input
app.use(express.text());
// browser don't know all character,
// to encode it 
app.use(express.urlencoded({extended:true}));


app.listen(ServerConfig.PORT,async ()=>{
    await connectDB();
    console.log(`server started at port ${ServerConfig.PORT}...!!`);
})
