const { COOKIE_SECURE } = require('../config/ServerConfig');
const { loginUser } = require('../services/authService');
const cookie = require('cookie');


async function login(req,res){
    // auth Controller
    try{
        const loginPayload = req.body;
        // response is token
        const response = await loginUser(loginPayload);
        // setting the cookie
        res.cookie('authToken',response.token,{
            httpOnly : true,
            secure : COOKIE_SECURE,
            maxAge : 7*24*60*60*1000
        })
        console.log("res:" ,res.cookies);
        return res.status(200).json({
            success:true,
            message:'Logged in successfully',
            data:{
                userRole : response.userRole,
                userData : response.data,
                cookie : response.token
            },
            error:{}
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            data:{},
            message:error.message,
            error:error
        })
    }
}

async function logout(req,res){
    try{
        console.log('cookie from frontend: ',req.cookies);

        res.cookie('authToken','');
        return res.status(200).json({
            success:true,
            message:'Logged out successfully',
            data:{},
            error:{}
        });
    }
    catch(error){
        console.log(error)
        return res.status(400).json({
            success:false,
            data:{},
            message:error.message,
            error:error
        })
    }
}

module.exports = {
    login,
    logout
}