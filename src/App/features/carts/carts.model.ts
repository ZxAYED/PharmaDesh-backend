import { model, Schema } from "mongoose";
import { ICart } from "./carts.interface";

const cartSchema = new Schema<ICart>(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            maxlength: [100, 'Email cannot be longer than 100 characters'],

        },

        products:
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'products',
                required: true,
            },
            quantity: {
                type: Number,
                required: [true, 'Quantity is required'],
                min: [1, 'Quantity cannot be less than 1'],
                max: [100, 'Quantity cannot be more than 100'],
                default: 1,
            },

        },


        totalPrice: {
            type: Number,
            required: [true, 'Total price is required'],
            min: [0, 'Total price cannot be negative'],
        },
    },
    { timestamps: true }
);

export const CartModel = model<ICart>('Carts', cartSchema)