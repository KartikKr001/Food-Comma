const { loginUser } = require('../services/authService')


async function login(req,res){
    // auth Service
    try{
        const loginPayload = req.body;

        console.log(loginPayload);

        const response = await loginUser(loginPayload);
        
        return res.status(200).json({
            success:true,
            message:'Logged in successfully',
            data:response,
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

module.exports = {
    login
}