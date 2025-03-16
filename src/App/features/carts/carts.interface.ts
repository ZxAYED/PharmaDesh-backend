import { Types } from "mongoose";


export interface ICart {
  email: string;
  products: {
    product: Types.ObjectId;
    quantity: number;
  };
  totalPrice: number;
}