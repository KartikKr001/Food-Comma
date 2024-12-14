const instance = require('../config/RazorpayConfig');
const crypto = require("crypto");
const ServerConfig = require('../config/ServerConfig')

const checkout = async (req,res)=>{     // create order
    console.log("payment2",req.body);
    try{
        const options = {
            amount: Number(req.body.amount)*100,  // amount in the smallest currency unit so multiply with 100  
            currency: "INR"
        };
        const order = await instance.orders.create(options);
        console.log("order came: ",order)
        return res.status(200).json({
            "order": order,
            success : true  
        })
    }
    catch(error){
        console.log("ami je to maa");
        return res.status(400).json({
            success: false
        })
    }
}


const paymentVerification =  (req,res)=>{
    try{    
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
        let body=razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac('sha256', instance.key_secret).update(body.toString()).digest('hex');
        
        if(expectedSignature === razorpay_signature){
            res.redirect(ServerConfig.FRONTEND_URL + `/order/success?reference=${razorpay_payment_id}`)
        }
        else{
            res.status(400).json({
                success : false                
            })
        }
        
    }
    catch(error){
        console.log("kartik's error: ",error);
        return res.status(400).json({
            success: false
        })
    }
}

module.exports = {
    checkout : checkout,
    paymentVerification : paymentVerification
}