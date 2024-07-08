// to make change visible everytime something changes in server
// to automattically restart server
// use NODEMON
const express = require('express')
const ServerConfig = require('./config/ServerConfig');
const connectDB = require('./config/DbConfig');
const userRouter = require('./routes/userRoute');
const cartRoute = require('./routes/cartRoute');
const app = express();




// middlewares
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}));

// routing middleware
app.use('/users',userRouter); //connects router to server
    
app.use('/carts',cartRoute); //connects router to server
    
app.listen(ServerConfig.PORT,async ()=>{
    await connectDB();
    console.log(`server started at port ${ServerConfig.PORT}...!!`);
})
