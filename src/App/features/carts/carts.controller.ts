import { Request, Response } from 'express';
import CatchAsync from "../../utils/CatchAsync";
import { cartsService } from './carts.service';


const addToCart = CatchAsync(async (req: Request, res: Response) => {

    const result = await cartsService.addToCartIntoDb(req.body);
    res.status(200).json({
        message: 'Item  has been added to cart',
        success: true,
        status: 200,
        data: result,
    });
})
const removeItemFromCart = CatchAsync(async (req: Request, res: Response) => {
    const result = await cartsService.removeItemFromCart(req.params.id)
    res.status(200).json({
        message: 'Item cancelled successfully',
        success: true,
        status: 200,
        data: result,
    })
})
const getSingleUserCart = CatchAsync(async (req: Request, res: Response) => {
    const result = await cartsService.getSingleUserCartFromDb(req.params.email)
    res.status(200).json({
        message: 'Carts retrieved successfully',
        success: true,
        status: 200,
        data: result,
    })

})


export const cartsController = {
    addToCart,
    removeItemFromCart,
    getSingleUserCart
}