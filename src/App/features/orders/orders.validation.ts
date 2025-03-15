import { z } from "zod";

const validStatus = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as const;
const validPaymentStatus = ['Pending', 'Paid', 'Initiated', 'Cancelled', 'Failed'] as const;

const addToCartValidation = z.object({
    email: z.string({ message: "Invalid email format" }),
    products: z.object({
        product: z.string({ message: "Product ID is required" }),
        quantity: z.number().int().positive({ message: "Quantity must be a positive integer" }),
    }),
    userId: z.string(),
    totalPrice: z.number().nonnegative({ message: "Total price must be non-negative" }),
});


const orderValidation = z.object({
    userEmail: z.string().email({ message: "Invalid email format" }),
    totalPrice: z.number().nonnegative({ message: "Total price must be non-negative" }),
    quantity: z.number().int().positive({ message: "Quantity must be a positive integer" }),
    status: z.enum(validStatus, { message: "Invalid order status" }).optional().default("Pending"),
    payment: z.object({
        status: z.enum(validPaymentStatus, { message: "Invalid payment status" }).optional(),
        OrderId: z.string().optional(),
        sp_code: z.number().optional(),
        sp_message: z.string().optional(),
        method: z.string().optional(),
        date_time: z.string().optional(),
        bank_status: z.string().optional(),
    }).optional(),

});

const updateCartValidation = z.object({
    email: z.string({ message: "Invalid email format" }).optional(),
    products:
        z.object({
            product: z.string({ message: "Product ID is required" }).optional(),
            quantity: z.number().int().positive({ message: "Quantity must be a positive integer" }).optional(),
        }).optional(),
    userId: z.string().optional(),

    totalPrice: z.number().nonnegative({ message: "Total price must be non-negative" }).optional(),
});


export { addToCartValidation, orderValidation, updateCartValidation };

