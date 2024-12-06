// to make change visible everytime something changes in server
// to automattically restart server
// use NODEMON
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const ServerConfig = require('./config/ServerConfig');
const connectDB = require('./config/DbConfig');
const userRoute = require('./routes/userRoute');
const cartRoute = require('./routes/cartRoute');
const authRoute = require('./routes/authRoute');
const { isLoggedIn } = require('./validation/authValidator');
const uploader = require('./Middlewares/MulterMiddleware');
const cloudinary = require('./config/cloudConfig');
const fs = require('fs/promises'); //to access file system
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');

const app = express();

// middlewares
app.use(cors({
    // origin : 'https://pizza-frontend-six.vercel.app',
    origin : ServerConfig.FRONTEND_URL,
    credentials : true  // to allow cookies
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}));

// testing api call for checking isLoggedIn middleware  
app.get('/ping',isLoggedIn,(req,res)=>{
    console.log(req.body);
    console.log(req.cookies);
    return res.json({message:"pong"});
})

// testing api call for uploading a single file
app.post('/photo',uploader.single('incomingFile'),async (req,res)=>{
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path); 
    console.log("result from cloudinary: ",result);

    // delete uploaded items on server/uploads folder
    await fs.unlink(req.file.path)
    return res.json({message : "oK"});
})


// routing middleware
app.use('/users',userRoute); //connects router to server
app.use('/carts',cartRoute); //connects router to server
app.use('/auth',authRoute); //connects router to server
app.use('/products',productRoute); //connects router to server
app.use('/orders',orderRoute); //connects router to server

    
app.listen(ServerConfig.PORT,async ()=>{
    await connectDB();
    console.log(`server started at port ${ServerConfig.PORT}...!!`);
})
