/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { PaymentResponse, VerificationResponse } from "Shurjopay";
import AppError from "../../Error/AppError";

import { CartModel } from "../carts/carts.model";
import { makePayment, verifyPayment } from "./order.utils";
import { SurjoPayload } from "./orders.interface";
import { OrderModel } from "./orders.model";








const getSingleOrderFromDb = async (orderId: string) => {

    const result = await OrderModel.findById(orderId).populate('products')
    return result
}
const getSingleOrdersOfUserFromDb = async (OrderId: string) => {

    const result = await OrderModel.findOne({ OrderId: OrderId }).populate('products')
    return result
}
const getAllOrdersOfUserDashboardIntoDb = async (email: string) => {

    const result = await OrderModel.find({ userEmail: email }).populate('products')
    return result
}


const createOrderIntoDb = async (payload: { userEmail: string, totalPrice: number, quantity: number }) => {

    const userEmail = payload.userEmail

    const allCarts = await CartModel.find({ email: userEmail })

    let products: any[] = [];

    allCarts.forEach(item => products.push(item.products.product._id))

    const orderData = {
        userEmail: userEmail,
        totalPrice: payload.totalPrice,
        quantity: payload.quantity,
        products: products,
    }
    const result = await OrderModel.create(orderData)
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

        await OrderModel.findByIdAndUpdate(payload.order_id, {
            payment:
            {
                status: 'Initiated',

            }, OrderId: payment.sp_order_id
        },
            { new: true, runValidators: true })
    }
    if (payment?.transactionStatus) {
        await OrderModel.updateOne({
            transaction: {
                id: payment.sp_order_id,
                transactionStatus: payment.transactionStatus,
            },
        });
    }

    if (payment?.transactionStatus === 'Completed') {
        await OrderModel.findByIdAndUpdate(payload.order_id, { paymentStatus: 'Initiated' })
    }
    return payment.checkout_url

}

const verifyPaymentIntoDb = async (orderId: string) => {
    const session = await mongoose.startSession();


    try {
        session.startTransaction();
        const result = await verifyPayment(orderId) as VerificationResponse[]

        await OrderModel.updateOne({ OrderId: result?.[0]?.order_id }, {
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


const deleteOrderFromDb = async (orderId: string) => {

    const deletedOrder = await OrderModel.findByIdAndDelete(orderId);
    if (!deletedOrder) {
        return {
            success: false,
            message: "Order item not found",
        };
    }
    return deletedOrder

}

const getAllOrdersOfUserIntoDb = async (orderId: string) => {
    const result = await OrderModel.findById(orderId).populate('products')
    return result
}
const getAllOrdersIntoDb = async () => {
    const result = await OrderModel.find().populate('products')

    return result
}

export const orderService = {
    getAllOrdersOfUserDashboardIntoDb,


    getAllOrdersOfUserIntoDb,

    makePaymentIntoDb,
    verifyPaymentIntoDb,
    createOrderIntoDb,
    getSingleOrderFromDb,
    getAllOrdersIntoDb, deleteOrderFromDb, getSingleOrdersOfUserFromDb
}
