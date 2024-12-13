const dotenv = require('dotenv');
const Razorpay = require('razorpay');
dotenv.config();

const instance = new Razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_SECRET
})

module.exports = instance
