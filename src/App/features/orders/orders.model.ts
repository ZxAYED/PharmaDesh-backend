import { Schema, model } from 'mongoose';
import { IOrder } from './orders.interface';



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
    shipmentStatus: {
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




export const OrderModel = model<IOrder>('Orders', orderSchema)


