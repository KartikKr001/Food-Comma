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
        id : decoded.id
    }

    next();

    // client -> middlewares -> controllers
}


module.exports = {
    isLoggedIn
}