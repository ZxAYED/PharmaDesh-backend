/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import CatchAsync from "../../utils/CatchAsync";
import { AuthService } from "./auth.service";

const register = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await AuthService.register(req.file, req.body);
    res.status(200).json({
        success: true,
        message: 'User created successfully',
        data: result
    });
});

const login = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthService.login(req.body);

    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        data: result
    });
});

const changePassword = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthService.changePassword(req.body);
    res.status(200).json({
        success: true,
        message: 'Password updated successfully',
        data: result
    });
})
const requestPasswordReset = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthService.requestPasswordReset(req.body);

    res.status(200).json({
        success: true,
        message: 'Password reset link  sent  to email successfully',
        data: result
    });
})
const resetPassword = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthService.resetPassword(req.query.token as string, req.body);
    res.status(200).json({
        success: true,
        message: 'Password reset successfully',
        data: result
    });
})
const refreshToken = CatchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.refreshToken(req.body.token)
    res.status(200).json({
        message: 'Token refreshed successfully',
        success: true,
        status: 200,
        data: result,
    })
})

export const AuthController = {
    register,
    login, changePassword, requestPasswordReset, resetPassword, refreshToken
}

