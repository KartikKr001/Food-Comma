const NotFound = require('../utils/notFoundError');

class cartService{
    constructor(_cartRepo){
        this.cartRepo = _cartRepo;
    }

    async getCart(userId){
        const cart = await this.cartRepo.getCartByUserId(userId);
        if(!cart){
            throw new NotFound("cart");
        }
        return cart;
    }
}

module.exports = cartService;
