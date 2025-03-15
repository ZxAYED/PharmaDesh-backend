import { Request, Response } from 'express'
import CatchAsync from '../../utils/CatchAsync'
import { productsService } from './products.service'



const createproduct = async (req: Request, res: Response) => {

  const result = await productsService.createProductIntoDb(req.files, req.body)
  res.status(200).json({
    message: 'Product created successfully',
    status: true,
    data: result,
  })
}


const getAllproducts = async (req: Request, res: Response) => {
  const result = await productsService.getAllProductsFromDb(req.query)
  res.status(200).json({
    message: 'Products retrieved successfully',
    status: true,
    data: result,
  })
}
const getAllproductsForAdmin = async (req: Request, res: Response) => {
  const result = await productsService.getAllproductsForAdminFromDb()
  res.status(200).json({
    message: 'Products retrieved successfully',
    status: true,
    data: result,
  })
}

const getSingleproduct = async (req: Request, res: Response) => {

  const result = await productsService.getSingleProductFromDb(req.params.productId)
  res.status(200).json({
    message: 'Product retrieved successfully',
    status: true,
    data: result,
  })
}

const updateProduct = CatchAsync(async (req: Request, res: Response) => {

  const payload = req.params.productId
  const data = req.body
  const result = await productsService.updateProductIntoDb(payload, data)
  res.status(200).json({
    message: 'Product updated  successfully',
    success: true,
    data: result,
  })
})


const deleteProduct = CatchAsync(async (req: Request, res: Response) => {

  const result = await productsService.deleteProductIntoDb(req.params.productId)
  res.status(200).json({
    message: 'Product deleted successfully',
    success: true,
    data: result,
  })


})


export const productsController = {
  createproduct,
  getAllproducts,
  getSingleproduct,
  updateProduct,
  deleteProduct,
  getAllproductsForAdmin
}
