const orderService = require('../services/orderService');
const AppError = require('../utils/AppError');
const userRepo = require('../repositories/userRepo')
const orderRepo = require('../repositories/orderRepo')
const cartRepo = require('../repositories/cartRepo')

async function createNewOrder(req,res){
    try{
        const userId = req.user.id;
        const order_service = new orderService(new userRepo(),new cartRepo(),new orderRepo());
        const order = await order_service.createOrder(userId,req.body.paymentMethod,req.body.address);
        console.log("in controller order : ",order);
        return res.status(201).json({
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

async function getAllOrdersByUser(req,res){
    try{
        const userId = req.user.id;
        const order_service = new orderService(new userRepo(),new cartRepo(),new orderRepo());
        const orders = await order_service.getAllOrdersCreatedByUser(userId);

        return res.status(200).json({
            success : true,
            message: 'Order fetched successfully',
            success :  true,
            data: orders,
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

async function OrderDetails(req,res){
    try{
        const order_service = new orderService(new userRepo(),new cartRepo(),new orderRepo());
        const order = await order_service.getOrderDetailsById(req.params.orderId);
        return res.status(200).json({
            success : true,
            message: 'Order details fetched successfully',
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

async function cancelOrder(req,res){
    try{
        const order_service = new orderService(new userRepo(),new cartRepo(),new orderRepo());
        const order = await order_service.updateOrder(req.params.orderId,'cancelled');
        return res.status(200).json({
            success : true,
            message: 'Order cancelled successfully',
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

async function changeOrderStatus(req,res){
    try{
        const order_service = new orderService(new userRepo(),new cartRepo(),new orderRepo());
        const order = await order_service.updateOrder(req.params.orderId,req.body.status);
        return res.status(200).json({
            success : true,
            message: 'Order status changed successfully',
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
    createNewOrder,
    getAllOrdersByUser,
    OrderDetails,
    cancelOrder,
    changeOrderStatus
}