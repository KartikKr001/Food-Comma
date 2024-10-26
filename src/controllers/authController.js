const { loginUser } = require('../services/authService')
const cookie = require('cookie')

async function login(req,res){
    // auth Service
    try{
        const loginPayload = req.body;
        
        const response = await loginUser(loginPayload);
        // response is token

        // setting the cookie
        res.cookie('authToken',response,{
            httpOnly : true,
            secure : false,
            maxAge : 7*24*60*60*1000
        })

        return res.status(200).json({
            success:true,
            message:'Logged in successfully',
            data:{},
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