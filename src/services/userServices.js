class UserService{
    constructor(_userRepo){
        this.userRepo = _userRepo;
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
            throw {reason:"Given email and mobile number already exists",statusCode:400}; 
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
            throw {reason:"Something went wrong cann't create user",statusCode:500};
        }

        // return details of created user
        return new_user;
    }
}

module.exports = UserService;