const UserRepo = require("../repositories/userRepo");
const UserService = require("../services/userServices");
const cartRepo = require('../repositories/cartRepo')

async function createUser(req,res){
    console.log(req.body);
    
    try{
        const userService = new UserService(new UserRepo(),new cartRepo());
        const response = await userService.registerUser(req.body);
        return res.status(201).json({
            message:"Successfully registered user!",
            success:true,
            data:response,
            error:{}
        })
    }catch(error){
        console.log("the error is: ",error);
        return res.status(error.statusCode).json({
            message:error.reason,
            success:false,
            data:{},
            error:error,
        })
        
    }
}



module.exports = {
    createUser
}