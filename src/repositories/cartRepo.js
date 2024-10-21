const Cart = require('../schema/cartSchema')

class cartRepo{
    async createCart(userId){
        console.log("INSIDE CART");
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

}

module.exports = cartRepo;