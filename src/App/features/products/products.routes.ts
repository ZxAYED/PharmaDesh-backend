import { Router } from "express"
import auth from "../../middleware/auth"
import upload from "../../utils/multer.config"
import validateRequest from "../../utils/ValidateRequest"
import { productsController } from "./products.controller"
import { createProductsValidationSchema, updateProductsValidationSchema } from "./products.validation"


const productsRouter = Router()

productsRouter.post(
    '/',
    auth('admin'),
    upload.array('imageUrls', 5),
    (req, res, next) => {
        req.body.imageUrls = req.files;
        next();
    },
    validateRequest(createProductsValidationSchema),
    productsController.createproduct
);

productsRouter.get('/', productsController.getAllproducts)

productsRouter.get('/admin', productsController.getAllproductsForAdmin)

productsRouter.get('/:productId', productsController.getSingleproduct)

productsRouter.patch('/:productId', auth('admin'),
    validateRequest(updateProductsValidationSchema), productsController.updateProduct)

productsRouter.delete('/:productId', auth('admin'), productsController.deleteProduct)







export default productsRouter