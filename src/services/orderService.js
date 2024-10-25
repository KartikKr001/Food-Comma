const AppError = require('../utils/AppError');
const BadRequestErrors = require('../utils/badRequestError');
const internalServerError = require('../utils/internalServerError');
const NotFound = require('../utils/notFoundError');

class orderService{
    constructor(_userRepo,_cartRepo,_orderRepo){
        this.userRepo = _userRepo;
        this.cartRepo = _cartRepo;
        this.orderRepo = _orderRepo;
    }

    async createOrder(userId,paymentMethod){
        const cart = await this.cartRepo.getCartByUserId(userId);
        const user = await this.userRepo.findUser(userId);
        if(!cart){
            throw new NotFound('cart')
        }
        if(cart.items.length === 0){
            throw new BadRequestErrors(['Cart is empty, please add some items to cart'])
        }
        const orderObject = {
            user : cart.user,
            status : "ordered",
            totalPrice : 0
        }
        orderObject.items = cart.items.map((x)=>{
            return {
                product : x.product._id,
                quantity : x.quantity
            }
        })
        cart.items.forEach((pro)=>
            orderObject.totalPrice += (pro.quantity)*(pro.product.price)
        )

        orderObject.address = user.address
        orderObject.paymentMethod = paymentMethod

        const order = await this.orderRepo.createNewOrder(orderObject);

        if(!order){
            throw new internalServerError();
        }
        await this.cartRepo.clearingCart(userId);
        return order;
    }
}

module.exports = orderService;
