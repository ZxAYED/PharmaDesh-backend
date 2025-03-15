import { Schema, model } from 'mongoose';
import { ICart, IOrder } from './orders.interface';


const cartSchema = new Schema<ICart>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      maxlength: [100, 'Email cannot be longer than 100 characters'],

    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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

const orderSchema = new Schema<IOrder>(
  {
    userEmail: {
      type: String,
      required: [true, 'Email is required'],
      maxlength: [100, 'Email cannot be longer than 100 characters'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0, 'Total price cannot be negative'],
    },
    quantity: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    payment: {
      status: {
        type: String,
        enum: ['Pending', 'Paid', 'Initiated', 'Cancelled', 'Failed'],
        default: 'Pending',
      },

      sp_code: Number,
      sp_message: String,
      method: String,
      date_time: String,
      bank_status: String,
    },
    products: {
      type: [String],
      required: [true, 'Product Ids are required'],
      ref: 'products'
    },
    OrderId: String,
  },
  { timestamps: true }

)




const CartModel = model<ICart>('Carts', cartSchema)
const OrderModel = model<IOrder>('Orders', orderSchema)

export const Models = { CartModel, OrderModel }
