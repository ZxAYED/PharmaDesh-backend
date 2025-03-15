import { Types } from "mongoose";



export interface ICart {
  email: string;
  userId: Types.ObjectId;
  products: {
    product: Types.ObjectId;
    quantity: number;
  };

  totalPrice: number;
}

export interface IOrder {
  userEmail: string;
  totalPrice: number;
  quantity: number
  products: string[];
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  OrderId: string;
  payment: {
    status: 'Pending' | 'Paid' | 'Initiated' | 'Cancelled' | 'Failed';

    sp_code: number;
    sp_message: string;
    method: string;
    date_time: string;
    bank_status: string;
  };
}
export interface SurjoPayload {
  order_id: string;
  customer_email: string;
  customer_name: string;
  quantity: number;
  amount: number;
  customer_phone: string;
  customer_address: string;
  currency: string;
}

