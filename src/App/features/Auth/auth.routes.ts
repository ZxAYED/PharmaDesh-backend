import { Router } from "express";
import validateRequest from "../../utils/ValidateRequest";
import { AuthController } from "./auth.controller";
import { createUserValidation, forgotPasswordValidation, loginUserValidation, refreshTokenValidation } from "./auth.validation";

import AppError from "../../Error/AppError";
import upload from "../../utils/multer.config";

const authRouter = Router();


authRouter.post(
    '/register',
    upload.single('profileImage'),
    (req, res, next) => {

        req.body.profileImage = req?.file;
        if (!req.body || !req.file) {
            throw new AppError(400, 'Missing required fields or file');
        }

        next();
    },
    validateRequest(createUserValidation),
    AuthController.register
);


authRouter.post('/login', validateRequest(loginUserValidation), AuthController.login);
authRouter.post('/change-password', validateRequest(forgotPasswordValidation), AuthController.changePassword);
authRouter.post('/request-password-reset', AuthController.requestPasswordReset);
authRouter.post('/reset-password', AuthController.resetPassword);
authRouter.post('/refresh-token', validateRequest(refreshTokenValidation), AuthController.refreshToken);
//;



export default authRouter;
