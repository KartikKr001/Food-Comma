const UserRepo = require("../repositories/userRepo");
const UserService = require("../services/userServices");

async function createUser(req,res){
    console.log(req.body);

    const userService = new UserService(new UserRepo());
    
    try{
        const response = await userService.registerUser(req.body);
        return res.status(201).json({
            message:"Successfully registered user!",
            success:true,
            data:response,
            error:{}
        })
    }catch(error){
        return res.status(error.statusCode).json({
            message:error.reason,
            success:false,
            data:{},
            error:error
        })
        
    }
}

module.exports = {
    createUser
}