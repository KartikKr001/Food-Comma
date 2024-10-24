const AppError = require('../utils/AppError');
const BadRequestErrors = require('../utils/badRequestError');
const NotFound = require('../utils/notFoundError');

class cartService{
    constructor(_cartRepo,_ProductRepo){
        this.cartRepo = _cartRepo;
        this.ProductRepo = _ProductRepo;
    }

    async getCart(userId){
        const cart = await this.cartRepo.getCartByUserId(userId);
        if(!cart){
            throw new NotFound("cart");
        }
        return cart;
    }


    async modifyCart(userId,productId,shouldAdd = true){
        try{
            const cart = await getCart(userId);
            const product = await getProd_id(productId);
            if(!product.inStock){
                throw new BadRequestErrors(['Product not available in the stock'])
            }

            // check for product present in cart
            let foundProduct = false;
            let qtyAdd = (shouldAdd == true)? 1 : -1;
            cart.items.forEach((i) => {
                if(shouldAdd){
                    if(i.product._id == productId){
                        i.quantity += qtyAdd;
                        foundProduct = true;
                    }
                }
                else{
                    if(i.product._id == productId){
                        if(i.quantity > 0){
                            i.quantity += qtyAdd;
                            foundProduct = true;
                            if(i.quantity == 0){
                                cart.items = cart.items.filter(item => item.product._id != productId);
                                return;
                            }
                        }
                    }
                }
            })

            if(foundProduct == false){
                if(shouldAdd){
                    cart.items.push({
                        product:productId,
                        quantity:1
                    })
                }
                else{
                    throw NotFound("product in cart")
                }
            }

            await cart.save();
        }   
        catch(error){

        }
    }
}

module.exports = cartService;
