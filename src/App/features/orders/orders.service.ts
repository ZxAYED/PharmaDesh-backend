/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { PaymentResponse, VerificationResponse } from "Shurjopay";
import AppError from "../../Error/AppError";
import { productsModel } from "../products/products.model";
import { makePayment, verifyPayment } from "./order.utils";
import { ICart, SurjoPayload } from "./orders.interface";
import { Models } from "./orders.model";


const addToCartIntoDb = async (payload: ICart) => {
    const productId = payload.products.product;

    const productDataList = await productsModel.find({ _id: productId });

    if (!productDataList.length) {
        return {
            status: 404,
            message: 'Product not found',
            success: false,
        };
    }

    const insufficientStock = productDataList.filter((requestedProduct) => {

        const productData = productDataList.find((product) => product._id === requestedProduct._id);


        if (!productData || !productData.inStock) {
            return true;
        }


        if (requestedProduct.quantity > productData.quantity) {
            return true;
        }

        return false;
    });

    if (insufficientStock.length > 0) {
        return {
            status: 400,
            message: `Insufficient stock for product(s): ${insufficientStock.map(item => item.name).join(', ')}`,
            success: false,
        };
    }




    productDataList.map((productData) => {
        const cartProduct = payload.products.product === productData._id;
        if (cartProduct) {
            const updatedQuantity = productData.quantity - payload.products.quantity;
            return productsModel.findByIdAndUpdate(productData._id, {
                quantity: updatedQuantity,
                inStock: updatedQuantity > 0,
            });
        }
    });
    const result = await Models.CartModel.create(payload);

    return result;


};


const generateRevenueFromDb = async () => {
    const result = await Models.CartModel.aggregate([
        {
            $addFields: {
                total: { $multiply: ["$totalPrice", "$products.quantity"] },
            },
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$total" },
            },
        },
    ]);

    if (result.length > 0) {
        return {
            message: "Revenue calculated successfully",
            success: true,
            data: { totalRevenue: result[0].totalRevenue },
        };
    } else {
        return {
            message: "No revenue data found",
            success: true,
            data: { totalRevenue: 0 },
        };
    }
};


const getSingleUserCartFromDb = async (userEmail: string) => {

    const result = await Models.CartModel.find({ email: userEmail }).populate('products.product').populate('userId')

    return result


}
const getSingleOrderFromDb = async (orderId: string) => {

    const result = await Models.OrderModel.findById(orderId).populate('products')
    return result
}
const getSingleOrdersOfUserFromDb = async (OrderId: string) => {

    const result = await Models.OrderModel.findOne({ OrderId: OrderId }).populate('products')
    return result
}
const getAllOrdersOfUserDashboardIntoDb = async (email: string) => {

    const result = await Models.OrderModel.find({ userEmail: email }).populate('products')
    return result
}


const createOrderIntoDb = async (payload: { userEmail: string, totalPrice: number, quantity: number }) => {

    const userEmail = payload.userEmail

    const allCarts = await Models.CartModel.find({ email: userEmail })

    let products: any[] = [];

    allCarts.forEach(item => products.push(item.products.product._id))

    const orderData = {
        userEmail: userEmail,
        totalPrice: payload.totalPrice,
        quantity: payload.quantity,
        products: products,
    }
    const result = await Models.OrderModel.create(orderData)
    return result

}


const makePaymentIntoDb = async (payload: SurjoPayload, client: string): Promise<any> => {

    const clientIp = client === '::1' ? '127.0.0.1' : client;

    const surjoPayload = {
        ...payload,
        client_ip: clientIp
    }

    const payment = await makePayment(surjoPayload) as PaymentResponse
    if (payment?.transactionStatus) {

        await Models.OrderModel.findByIdAndUpdate(payload.order_id, {
            payment:
            {
                status: 'Initiated',

            }, OrderId: payment.sp_order_id
        },
            { new: true, runValidators: true })
    }
    if (payment?.transactionStatus) {
        await Models.OrderModel.updateOne({
            transaction: {
                id: payment.sp_order_id,
                transactionStatus: payment.transactionStatus,
            },
        });
    }

    if (payment?.transactionStatus === 'Completed') {
        await Models.OrderModel.findByIdAndUpdate(payload.order_id, { paymentStatus: 'Initiated' })
    }
    return payment.checkout_url

}

const verifyPaymentIntoDb = async (orderId: string) => {
    const session = await mongoose.startSession();


    try {
        session.startTransaction();
        const result = await verifyPayment(orderId) as VerificationResponse[]

        await Models.OrderModel.updateOne({ OrderId: result?.[0]?.order_id }, {
            payment: {
                status: result?.[0]?.bank_status === 'Success' ? "Paid" : result?.[0]?.bank_status === 'Failed' ? "Pending" : result?.[0]?.bank_status === 'Cancel' ? "Cancelled" : "Initiated",
                orderId,
                sp_code: result?.[0]?.sp_code,
                sp_message: result?.[0]?.sp_message,
                method: result?.[0]?.method,
                date_time: result?.[0]?.date_time,
                bank_status: result?.[0]?.bank_status,
            },
        }, { new: true, runValidators: true })

        await session.commitTransaction();
        await session.endSession();
        return result

    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(err, 'Failed to verify payment');
    }


}


const removeItemFromCart = async (orderId: string) => {

    const deletedCart = await Models.CartModel.findByIdAndDelete(orderId);
    if (!deletedCart) {
        return {
            success: false,
            message: "Cart item not found",
        };
    }
    return deletedCart


}
const deleteOrderFromDb = async (orderId: string) => {

    const deletedOrder = await Models.OrderModel.findByIdAndDelete(orderId);
    if (!deletedOrder) {
        return {
            success: false,
            message: "Order item not found",
        };
    }
    return deletedOrder

}

const getAllOrdersOfUserIntoDb = async (orderId: string) => {
    const result = await Models.OrderModel.findById(orderId).populate('products')
    return result
}
const getAllOrdersIntoDb = async () => {
    const result = await Models.OrderModel.find().populate('products')

    return result
}

export const orderService = {
    addToCartIntoDb, getAllOrdersOfUserDashboardIntoDb,
    generateRevenueFromDb,
    getSingleUserCartFromDb,
    getAllOrdersOfUserIntoDb,
    removeItemFromCart,
    makePaymentIntoDb,
    verifyPaymentIntoDb,
    createOrderIntoDb,
    getSingleOrderFromDb,
    getAllOrdersIntoDb, deleteOrderFromDb, getSingleOrdersOfUserFromDb
}
