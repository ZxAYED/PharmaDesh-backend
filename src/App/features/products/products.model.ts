import { Schema, model } from 'mongoose';
import { IProduct, MedicineCategoriesArray } from './products.interface';

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  advices: { type: [String], required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: {
    enum: MedicineCategoriesArray,
    required: true
  },
  rating: { type: Number, required: true, min: 0, max: 5 },
  imageUrls: { type: [String], required: true },
  manufacturer: { type: String, required: true },
  expiryDate: { type: String, required: true },
  requiresPrescription: { type: Boolean, required: true },
});

export const ProductModel = model<IProduct>('Product', ProductSchema);



