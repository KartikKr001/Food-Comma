const jwt = require('jsonwebtoken');
const { secret_key } = require('../config/ServerConfig');

async function isLoggedIn(req,res,next){
    const token = req.cookies['authToken'];
    if(!token){
        return res.status(401).json({
            success : false,
            data : {},
            error:"Not authenticated",
            message: "No auth token provided"
        });
    }
    
    const decoded = jwt.verify(token,secret_key);
    // decoded -> payload
    
    if(!decoded){
        return res.status(401).json({
            success : false,
            data : {},
            error:"Not authenticated",
            message: "Invalid Token"
        });
    }

    // if reached here then user is authenticated 
    // allow user to access api

    req.user = { 
        // this part is written because
        // in contoller we may need to see that who has called this
        email : decoded.email,
        id : decoded.id,
        role : decoded.role
    }

    next();

    // client -> middlewares -> controllers
}


function isAdmin(req,res,next) {
    // since called after isLogged in 
    // we will recieve user details
    const LoggedInUser = req.user;
    console.log("Check for admin: ",LoggedInUser);
    if(LoggedInUser.role === "ADMIN"){
        next();
    }
    else{
        return res.status(401).json({
            success : false,
            data : {},
            message :"You are not authorized for this action",
            error:{
                statusCode : 401,
                reason: "Unauthorized user for this action"
            }
        })
    }

}

module.exports = {
    isLoggedIn,
    isAdmin
}