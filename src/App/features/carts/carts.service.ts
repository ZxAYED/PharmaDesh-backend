import { IProduct } from "../products/products.interface";
import { ProductModel } from "../products/products.model";
import { ICart } from "./carts.interface";
import { CartModel } from "./carts.model";

const addToCartIntoDb = async (payload: ICart) => {
    const productId = payload.products.product;

    const productDataList = await ProductModel.find({ _id: productId });

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
            const updatedQuantity = (productData as IProduct).quantity - payload.products.quantity;
            return ProductModel.findByIdAndUpdate(productData._id, {
                quantity: updatedQuantity,
                stock: updatedQuantity > 0,
            });
        }
    });
    const result = await CartModel.create(payload);

    return result;


};




const getSingleUserCartFromDb = async (userEmail: string) => {

    const result = await CartModel.find({ email: userEmail }).populate('products.product')

    return result


}
const removeItemFromCart = async (orderId: string) => {

    const deletedCart = await CartModel.findByIdAndDelete(orderId);
    if (!deletedCart) {
        return {
            success: false,
            message: "Cart item not found",
        };
    }
    return deletedCart

}
export const cartsService = {
    addToCartIntoDb,
    getSingleUserCartFromDb,
    removeItemFromCart,
};