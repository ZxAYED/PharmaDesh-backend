import { Router } from 'express'
import auth from '../../middleware/auth'
import validateRequest from '../../utils/ValidateRequest'
import { orderController } from './orders.controller'
import { addToCartValidation, orderValidation } from './orders.validation'



const orderRoutes = Router()



orderRoutes.post('/carts', auth('user'),
    validateRequest(addToCartValidation),
    orderController.addToCart)
orderRoutes.post('/', auth('user'),
    validateRequest(orderValidation),
    orderController.createOrder)
orderRoutes.post('/payment', auth('user'), orderController.makePayment)

orderRoutes.get('/cart/:email', auth('user'), orderController.getSingleUserCart)
orderRoutes.get('/:orderId', auth('user'), orderController.getSingleOrderCart)
orderRoutes.get('/user/:orderId', auth('user'), orderController.getAllOrdersOfUser)
orderRoutes.get('/user/singleOrder/:orderId', auth('user'), orderController.getSingleOrdersOfUser)
orderRoutes.get('/dashboard/:email', auth('user'), orderController.getAllOrdersOfUserDashboard)
orderRoutes.get('/', orderController.getAllOrders)


orderRoutes.delete('/cart/:id', auth('user'), orderController.removeItemFromCart)
orderRoutes.delete('/order/:id', auth('user'), orderController.deleteOrder)




orderRoutes.get('/payment/verify-payment', auth('user'), orderController.verifyPayment)
orderRoutes.get('/admin-revenue', orderController.generateRevenue)
orderRoutes.get('/', auth('admin'), orderController.getAllOrders)






export default orderRoutes
