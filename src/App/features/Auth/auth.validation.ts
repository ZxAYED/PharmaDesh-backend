import { z } from "zod";



export const createUserValidation = z.object({
    name: z.string({ message: "Name is required" }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    role: z.enum(["admin", "user"], { message: "Role must be either 'admin' or 'user'" }).default('user'),
    status: z.enum(["active", "blocked"], { message: "Status must be 'active' or 'blocked'" }).default('active'),
    address: z.string({ message: "Address is required" }),
    phone: z.string({
        message: "Invalid phone number. It must be a valid Bangladeshi number from Airtel, Robi, Banglalink, Teletalk, or Grameenphone.",
    }),
    profileImage: z.object({
        filename: z.string().optional(),
        path: z.string().optional(),
        mimetype: z.string().optional(),
    }).optional(),
    isPasswordMatch: z.string().min(6, { message: "Password must be at least 6 characters" }).optional(),
});

export const updateUserValidation = z.object({
    name: z.string({ message: "Name cannot be empty" }).optional(),
    email: z.string().email({ message: "Invalid email format" }).optional(),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }).optional(),
    role: z.enum(["admin", "user"], { message: "Invalid role" }).optional(),
    status: z.enum(["active", "blocked"], { message: "Invalid status" }).optional(),
    address: z.string({ message: "Address cannot be empty" }).optional(),
    phone: z.string({
        message: "Invalid phone number. It must be a valid Bangladeshi number from Airtel, Robi, Banglalink, Teletalk, or Grameenphone.",
    }).optional(),
    profileImage: z.object({
        filename: z.string().optional(),
        path: z.string().optional(),
        mimetype: z.string().optional(),
    }).optional(),
    isPasswordMatch: z.string().min(6, { message: "Password must be at least 6 characters" }).optional(),
});
export const forgotPasswordValidation = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    oldPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
    newPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
});
export const loginUserValidation = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});
export const refreshTokenValidation = z.object({
    cookies: z.object({
        refreshToken: z.string({
            required_error: 'Refresh token is required!',
        }),
    }),
});