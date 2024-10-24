const Cart = require('../schema/cartSchema')
const internalServerError = require('../utils/internalServerError');


class cartRepo{
    async createCart(userId){
        try{
            const newCart = await Cart.create({
                user : userId
            })    
            console.log("Cart created: ",newCart);
        }
        catch(error){
            if(error.name == 'Validation Error'){
                const errorMessageList = Object.keys(error.errors).map((property)=>{
                    return error.errors[property].message;
                })
                throw new BadRequestErrors(errorMessageList); 
            }
            console.log('Product Find error',error);
            throw new internalServerError(errorMessageList);
        }
    } 

    async getCartByUserId(userId){
        try{
            const cart = await Cart.findOne({
                user : userId
            }).populate('items.product');
            // .populate is used as join
            return cart;
        }
        catch(error){
            console.log(error);
            throw new internalServerError(error);
        }
    }

    async clearingCart(userId){
        try{
            const cart = await Cart.findById({
                user : userId
            });
            if(!cart){
                throw new NotFoundError('Cart not found');
            }
            cart.items = [];
            await cart.save();
            return cart;
        }
        catch(error){
            throw new internalServerError();
        }
            
    }

}

module.exports = cartRepo;