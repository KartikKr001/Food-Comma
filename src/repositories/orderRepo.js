const order = require('../schema/orderSchema')
const internalServerError = require('../utils/internalServerError');


class orderRepo{
    async createNewOrder(orderDetails){
        try{
            const newOrder = await order.create(orderDetails); 
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

    async getorderByorderDetails(orderDetails){
        try{
            const order = await order.findOne({
                user : orderDetails
            }).populate('items.product');
            // .populate is used as join
            return order;
        }
        catch(error){
            console.log(error);
            throw new internalServerError(error);
        }
    }

    async clearingorder(orderDetails){
        try{
            const order = await order.findById({
                user : orderDetails
            });
            if(!order){
                throw new NotFoundError('order not found');
            }
            order.items = [];
            await order.save();
            return order;
        }
        catch(error){
            throw new internalServerError();
        }
            
    }

}

module.exports = orderRepo;