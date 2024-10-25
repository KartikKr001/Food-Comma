const orderService = require('../services/orderService');
const AppError = require('../utils/AppError');

async function createNewOrder(req,res){
    try{
        const userId = req.user.id;
        const order = orderService.createOrder(userId,req.body.paymentMethod);
        return res.status(200).json({
            message: 'Order created successfully',
            success :  true,
            data: order,
            error : {}
    });
    }catch(error){
        console.log(error);
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success : false,
                message : error.message,
                data : {},
                error : error
            });
        }
        return res.status(500).json({
            success:false,
            message:'something went wrong',
            data : {},
            error : error
        })
    }
        
}


module.exports = {
    createNewOrder
}