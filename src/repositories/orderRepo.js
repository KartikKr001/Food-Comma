const Order = require('../schema/orderSchema')
const internalServerError = require('../utils/internalServerError');
const BadRequestErrors = require('../utils/badRequestError');


class orderRepo{
    async createNewOrder(orderDetails){
        console.log(orderDetails);
        try{
            const newOrder = await Order.create(orderDetails); 
            console.log(newOrder)
            return newOrder;
        }
        catch(error){
            if(error.name == 'ValidationError'){
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
            const new_order = await Order.findById(orderId).populate('items.product');
            // .populate is used as join
            return new_order;
        }
        catch(error){
            console.log(error);
            throw new internalServerError(error);
        }
    }

    async updatingOrderStatus(orderId,status){  
        try{
            const new_order = await Order.findByIdAndUpdate(orderId,{status : status},{new : true});
            return new_order;
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