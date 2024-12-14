const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    // all these restrictions are for mongoose not for mongo db
    firstName:{
        // all these are validators
        type:String,
        required:[true,"first name is required"],
        minlength:[5,"First name must be atleast 5 character long"],
        lowercase:true,
        trim:true,
        maxlength:[20,"First name must be less than or equal to 20 characters"]
    },
    lastName:{
        type:String,
        // required:[true,"last name is required"],
        minlength:[5,"last name must be atleast 5 character long"],
        lowercase:true,
        trim:true,
        maxlength:[20,"last name must be less than or equal to 20 characters"]
    },
    mobileNumber:{
        type:Number,
        unique:[true,"Phone number already in use"],
        maxlength:[10,"Phone number must be of length 10"],
        minlength:[10,"Phone number must be of length 10"],
        required:[true,"Phone number shoud be provided"],
        trim:true,
    },
    email:{
        type:String,
        trim:true,
        required:[true,"email is required"],
        unique:[true,"email is already in use"],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please fill valid email address'] 
    },
    password:{
        type:String,
        required:[true,"email is required"],
        minlength:[6,"Password must be of same length"]
    },
    role:{
        type:String,
        enum : ['ADMIN','USER'],
        default : 'USER'
    }
},{
    timestamps:true
});


userSchema.pre('save', async function(){
    // you can modify user before saving in db
    // for changing the password
    const hashPassword = await bcrypt.hash(this.password,10);
    this.password = hashPassword;
    // here 10 is salt value
    console.log("Exiting pre saved hook and creating user");
})

const User = mongoose.model("User",userSchema);

module.exports = User;