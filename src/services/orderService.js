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

    async createOrder(userId,paymentMethod,address){
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
            address : address,
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

        orderObject.paymentMethod = paymentMethod

        const order = await this.orderRepo.createNewOrder(orderObject);
        console.log("order created : ",order);
        if(!order){
            console.log("hello")
            throw new internalServerError();
        }
        await this.cartRepo.clearingCart(userId);
        return order;
    }

    async getAllOrdersCreatedByUser(userId){
        const orders = await this.orderRepo.getOrderByUserId(userId);
        if(!orders){
            throw new NotFound('orders');
        }
        return orders;
    }

    async getOrderDetailsById(orderId){
        const order = await this.orderRepo.getOrderById(orderId);
        if(!order){
            throw new NotFound('order');
        }   
        return order;
    }

    async updateOrder(orderId, status){
        const order = await this.orderRepo.updateOrderStatus(orderId, status);
        if(!order){
            throw new NotFound('order');
        }
        return order;
    }

}

module.exports = orderService;
