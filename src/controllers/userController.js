const UserRepo = require("../repositories/userRepo");
const UserService = require("../services/userServices");
const cartRepo = require('../repositories/cartRepo');
const AppError = require('../utils/AppError')

async function createUser(req,res){
    console.log("req: ",req.body);
    try{
        const userService = new UserService(new UserRepo(),new cartRepo());
        const response = await userService.registerUser(req.body);
        console.log('user created')
        return res.status(201).json({
            message:"Successfully registered user!",
            success:true,
            data:response,
            error:{}
        })
    }catch(error){
        console.log("the error is control: ",error);
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success : false,
                message : error.message,
                data : {},
                error : error
            });
        }
        else{
            return res.status(500).json({
            success:false,
            message:'something went wrong',
            data : {},
            error : error
            })
        }
    }
}



module.exports = {
    createUser
}