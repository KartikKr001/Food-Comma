const cartService = require("../services/cartService")
const cartRepo = require('../repositories/cartRepo')
const AppError = require('../utils/AppError');
const ProductRepo = require("../repositories/productRepo");

async function getCartByUser(req,res){
    try{
        const cart_service = new cartService(new cartRepo(),new ProductRepo())
        const cart = await cart_service.getCart(req.user.id);
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
        const cart_service = new cartService(new cartRepo(),new ProductRepo())
        const cart = await cart_service.modifyCart(req.user.id,req.params.productId,req.params.operation == 'add');
        console.log("hello : ",cart);
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

async function clearCart(req,res){
    try{
        const cart_service = new cartService(new cartRepo(),new ProductRepo())
        const cart = await cart_service.clearProductsFromCart(req.user.id);

        return res.status(200).json({
            success : true,
            data : cart,
            message : "Successfully cleared cart",
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
    modifyProductToCart,
    clearCart
}