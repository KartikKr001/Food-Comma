const Order = require('../schema/orderSchema')
const internalServerError = require('../utils/internalServerError');


class orderRepo{
    async createNewOrder(orderDetails){
        try{
            const newOrder = await Order.create(orderDetails); 
            return newOrder
        }
        catch(error){
            if(error.name == 'Validation Error'){
                const errorMessageList = Object.keys(error.errors).map((property)=>{
                    return error.errors[property].message;
                })
                throw new BadRequestErrors(errorMessageList); 
            }
            console.log(error)
            throw new internalServerError(errorMessageList);
        }
    } 

    async getOrderById(orderId){
        try{
            const order = await Order.findById(orderId).populate('items.product');
            // .populate is used as join
            return order;
        }
        catch(error){
            console.log(error);
            throw new internalServerError(error);
        }
    }

    async updatingOrderStatus(orderId,status){  
        try{
            const order = await Order.findByIdAndUpdate(orderId,{status : status},{new : true});
            return order;
        }
        catch(error){
            console.log(error);
            throw new internalServerError();
        }
            
    }

    async getOrderByUserId(userId){
        try{
            const order = await Order.find({user:userId}).populate('items.product');
            return order;
        }
        catch(error){
            console.log(error);
            throw new internalServerError();
        }
    }

}

module.exports = orderRepo;