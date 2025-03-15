import { z } from 'zod';
import { MedicineCategoriesArray } from './products.interface';

const createProductsValidationSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  advices: z.array(z.string()),
  price: z.number().positive('Price must be a positive number'),
  stock: z.number().nonnegative('Stock cannot be negative'),
  category: z.enum([...MedicineCategoriesArray]),
  rating: z.number().min(0, 'Rating must be at least 0').max(5, 'Rating cannot exceed 5'),
  imageUrls: z.array(z.string().url()),
  manufacturer: z.string().min(3, 'Manufacturer must be at least 3 characters long'),
  expiryDate: z.string(),
  requiresPrescription: z.boolean(),
});
const updateProductsValidationSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long').optional(),
  description: z.string().min(10, 'Description must be at least 10 characters long').optional(),
  advices: z.array(z.string()).nonempty('Advices cannot be empty').optional(),
  price: z.number().positive('Price must be a positive number').optional(),
  stock: z.number().nonnegative('Stock cannot be negative').optional(),
  category: z.enum([...MedicineCategoriesArray]).optional(),
  rating: z.number().min(0, 'Rating must be at least 0').max(5, 'Rating cannot exceed 5').optional(),
  imageUrls: z.array(z.string().url()).optional(),
  manufacturer: z.string().min(3, 'Manufacturer must be at least 3 characters long').optional(),
  expiryDate: z.string().optional(),
  requiresPrescription: z.boolean().optional(),
});

// const addToCartValidationSchema = z.object({
//   userEmail: z.string(),
//   productId: z.string(),
//   quantity: z.number().int().min(1, 'Quantity must be a positive integer'),
//   total: z.number(),
// })

export {
  //  addToCartValidationSchema,
  createProductsValidationSchema, updateProductsValidationSchema
};

