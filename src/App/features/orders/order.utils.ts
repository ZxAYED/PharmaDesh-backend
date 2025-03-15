/* eslint-disable @typescript-eslint/no-explicit-any */


import Shurjopay, { PaymentResponse, VerificationResponse } from 'Shurjopay';
import config from '../../config';
const shurjopay = new Shurjopay()

shurjopay.config(
    config.SP_ENDPOINT!,
    config.SP_USERNAME!,
    config.SP_PASSWORD!,
    config.SP_PREFIX!,
    config.SP_RETURN_URL!
);
export const makePayment = async (payload: any) => {

    return new Promise((resolve, reject) => {
        shurjopay.makePayment(payload, (response: PaymentResponse) => {

            resolve(response)
        }, (error: any) => {

            reject(error)
        })
    })
}
export const verifyPayment = async (orderId: any) => {
    return new Promise((resolve, reject) => {
        shurjopay.verifyPayment(orderId, (response: VerificationResponse[]) => {
            resolve(response)
        }, (error: any) => {
            reject(error)
        })
    })
}