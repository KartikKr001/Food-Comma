const BadRequestErrors = require("../utils/badRequestError");
const internalServerError = require("../utils/internalServerError");

class UserService{
    constructor(_userRepo,_cartRepo){
        this.userRepo = _userRepo;
        this.cartRepo = _cartRepo;
    }

    async registerUser(userDetails){
        // create brand new user in db

        // we will check if all necessary conditions are present(email,moblie are unique)
        const user = await this.userRepo.findUser({
            email:userDetails.email,
            mobileNumber:userDetails.mobileNumber
        });
        // create user in db
        if(user){
            // we found user
            console.log(user)
            throw new BadRequestErrors(["Given email and mobile number already exists"]);
        }
        // user not found
        // create
        const new_user = await this.userRepo.create_user({
            email:userDetails.email,
            password:userDetails.password,
            mobileNumber:userDetails.mobileNumber,
            firstName:userDetails.firstName,
            lastName:userDetails.lastName
        });
        
        if(!new_user){
            throw internalServerError();
        }


        await this.cartRepo.createCart(new_user._id);
        return new_user;
    }
}

module.exports = UserService;