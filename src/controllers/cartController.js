const cartService = require("../services/cartService")
const AppError = require('../utils/AppError');

async function getCartByUser(req,res){
    try{
        const cart = await cartService.getCart(req.user.id);
        return res.status(200).json({
            success : true,
            data : cart,
            message : "Cart retrieved successfully",
            error : {}
        })
    }catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success : false,
                message : error.message,
                data : {},
                error : error
            });
        }
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'something went wrong',
            data : {},
            error : error
        })
    }   
}

async function modifyProductToCart(req,res){
    try{
        const cart = await cartService.modifyCart(req.user.id,req.params.productId,req.params.operation == 'add');
        return res.status(200).json({
            success : true,
            data : cart,
            message : "Successfully added product to cart",
            error : {}
        })
    }catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success : false,
                message : error.message,
                data : {},
                error : error
            });
        }
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'something went wrong',
            data : {},
            error : error
        })
    }   
}

module.exports = {
    getCartByUser,
    modifyProductToCart
}