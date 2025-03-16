/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../Error/AppError";
import QueryBuilder from "../../utils/QueryBuilder";
import UploadImageToCloudinary from "../../utils/UploadImageToCloudinary";
import { IProduct } from "./products.interface";
import { ProductModel } from "./products.model";




const createProductIntoDb = async (file: any, payload: IProduct) => {



    if (file) {
        const imageName = `${payload?.name}+${Date.now()}`;
        const path = file?.buffer;
        const uploadResponse = await UploadImageToCloudinary(imageName, path);
        payload.profileImage = uploadResponse.url;

    }

    const result = await ProductModel.create(payload)
    return result

}


const getAllProductsFromDb = async (query: any) => {

    const SearchableFields = ['name', 'brand', 'category', 'description']

    const productsQuery = new QueryBuilder(
        ProductModel.find(), query)
        .search(SearchableFields)
        .pricefilter()
        .categoriesfilter()
        .sort()
        .paginate()
        .fields();


    const result = await productsQuery.modelQuery;

    const meta = await productsQuery.countTotal();


    return {
        meta,
        result,
    };

}
const getSingleProductFromDb = async (payload: string) => {
    const product = await ProductModel.findById(payload)
    return product

}
const getAllproductsForAdminFromDb = async () => {
    const product = await ProductModel.find()
    return product

}

const updateProductIntoDb = async (payload: string, data: IProduct) => {


    const product = await ProductModel.findByIdAndUpdate(payload, data, {
        new: true,
        runValidators: true,
    });

    return product;
};


const deleteProductIntoDb = async (payload: string) => {
    const findProduct = await ProductModel.findById(payload)
    if (!findProduct) {
        throw new AppError(404, 'Product not found')
    }
    const product = await ProductModel.findByIdAndDelete(payload)
    return product
}





export const productsService = {
    createProductIntoDb,
    getAllProductsFromDb,
    getSingleProductFromDb,
    updateProductIntoDb,
    deleteProductIntoDb,
    getAllproductsForAdminFromDb
}
