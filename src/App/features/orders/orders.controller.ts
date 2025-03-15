import { Request, Response } from 'express';
import CatchAsync from '../../utils/CatchAsync';
import { orderService } from './orders.service';




const addToCart = CatchAsync(async (req: Request, res: Response) => {

  const result = await orderService.addToCartIntoDb(req.body);
  res.status(200).json({
    message: 'Item  has been added to cart',
    success: true,
    status: 200,
    data: result,
  });
})
const createOrder = CatchAsync(async (req: Request, res: Response) => {

  const result = await orderService.createOrderIntoDb(req.body);
  res.status(200).json({
    message: 'Order  has been placed',
    success: true,
    status: 200,
    data: result,
  });
})

const getAllOrdersOfUser = CatchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getAllOrdersOfUserIntoDb(req.params.orderId)
  res.status(200).json({
    message: 'Order fetched successfully',
    success: true,
    status: 200,
    data: result,
  })
})
const getSingleOrdersOfUser = CatchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getSingleOrdersOfUserFromDb(req.params.orderId)
  res.status(200).json({
    message: 'Order fetched successfully',
    success: true,
    status: 200,
    data: result,
  })
})
const getAllOrdersOfUserDashboard = CatchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getAllOrdersOfUserDashboardIntoDb(req.params.email)
  res.status(200).json({
    message: 'All Orders fetched successfully',
    success: true,
    status: 200,
    data: result,
  })
})
const getAllOrders = CatchAsync(async (req: Request, res: Response) => {

  const result = await orderService.getAllOrdersIntoDb()
  res.status(200).json({
    message: 'All Orders fetched successfully',
    success: true,
    status: 200,
    data: result,
  })
})
const removeItemFromCart = CatchAsync(async (req: Request, res: Response) => {
  const result = await orderService.removeItemFromCart(req.params.id)
  res.status(200).json({
    message: 'Order cancelled successfully',
    success: true,
    status: 200,
    data: result,
  })
})
const deleteOrder = CatchAsync(async (req: Request, res: Response) => {
  const result = await orderService.deleteOrderFromDb(req.params.id)
  res.status(200).json({
    message: 'Order cancelled successfully',
    success: true,
    status: 200,
    data: result,
  })
})

const generateRevenue = CatchAsync(async (req: Request, res: Response) => {
  const result = await orderService.generateRevenueFromDb()
  res.status(200).json({
    message: 'Revenue calculated successfully',
    success: true,
    status: 200,
    data: result,
  })
})
const getSingleUserCart = CatchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getSingleUserCartFromDb(req.params.email)
  res.status(200).json({
    message: 'Order retrieved successfully',
    success: true,
    status: 200,
    data: result,
  })
})
const getSingleOrderCart = CatchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getSingleOrderFromDb(req.params.orderId)
  res.status(200).json({
    message: 'Cart retrieved successfully',
    success: true,
    status: 200,
    data: result,
  })
})
const makePayment = CatchAsync(async (req: Request, res: Response) => {
  const result = await orderService.makePaymentIntoDb(req.body, req.ip as string)

  res.status(200).json({
    message: 'Payment successful',
    success: true,
    status: 200,
    data: result,
  })
})

const verifyPayment = CatchAsync(async (req: Request, res: Response) => {

  const result = await orderService.verifyPaymentIntoDb(req.query.order_id as string)

  res.status(200).json({
    message: 'Payment verified successfully',
    success: true,
    data: result,
  })
})
export const orderController = {
  addToCart, getAllOrdersOfUserDashboard,
  generateRevenue, createOrder, getSingleOrderCart, getAllOrdersOfUser, getSingleUserCart, removeItemFromCart, makePayment, verifyPayment, getAllOrders, deleteOrder, getSingleOrdersOfUser
};
