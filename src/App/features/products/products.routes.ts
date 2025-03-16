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
    upload.single('profileImage'),
    (req, res, next) => {
        req.body.profileImage = req.file;
        next();
    },
    validateRequest(createProductsValidationSchema),
    productsController.createproduct
);

productsRouter.get('/', productsController.getAllproducts)

productsRouter.get('/admin', auth('admin'), productsController.getAllproductsForAdmin)

productsRouter.get('/:productId', auth('user', 'admin'), productsController.getSingleproduct)

productsRouter.patch('/:productId', auth('admin'),
    validateRequest(updateProductsValidationSchema), productsController.updateProduct)

productsRouter.delete('/:productId', auth('admin'), productsController.deleteProduct)







export default productsRouter