import { z } from "zod";

const addToCartValidation = z.object({
    email: z.string({ message: "Invalid email format" }),
    products: z.object({
        product: z.string({ message: "Product ID is required" }),
        quantity: z.number().int().positive({ message: "Quantity must be a positive integer" }),
    }),
    userId: z.string(),
    totalPrice: z.number().nonnegative({ message: "Total price must be non-negative" }),
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

export { addToCartValidation, updateCartValidation };
