import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../utils/ValidateRequest";
import { cartsController } from "./carts.controller";
import { addToCartValidation } from "./carts.validation";

const cartRouter = Router();


cartRouter.post('/carts', auth('user'),
    validateRequest(addToCartValidation), cartsController.addToCart)

cartRouter.get('/carts/:email', auth('user'), cartsController.getSingleUserCart)
cartRouter.delete('/cart/:id', auth('user'), cartsController.removeItemFromCart)


export default cartRouter