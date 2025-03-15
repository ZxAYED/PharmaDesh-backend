/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import config from "../../config";
import AppError from "../../Error/AppError";
import UploadImageToCloudinary from "../../utils/UploadImageToCloudinary";
import { IAuth, IAuthChangePassword, IAuthRegister, IAuthRequestPasswordReset } from "./auth.interface";
import userModel from "./auth.model";
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import crypto from 'crypto';
import sendResetPasswordEmail from "../../utils/nodeMailer.config";


const register = async (file: any, payload: IAuthRegister) => {
    const { email, password } = payload;
    const UserEmail = email.toLowerCase();
    payload.email = UserEmail;
    const isUserExists = await userModel.findOne({ email });
    if (isUserExists) {
        throw new AppError(409, 'User already exists');
    }

    if (file) {
        const imageName = `${payload.name}-${payload.email}`;
        const uploadedImageUrl = await UploadImageToCloudinary(imageName, file.buffer);
        payload.profileImage = uploadedImageUrl.url;
    }

    payload.password = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
    payload.passwordChangedAt = new Date();
    payload.role = 'user';
    payload.status = 'active';
    payload.isDeleted = false;

    const user = await userModel.create(payload);
    return user;
};






const login = async (payload: IAuth) => {
    const { email, password } = payload;
    const UserEmail = email.toLowerCase();
    payload.email = UserEmail;
    const user = await userModel.findOne({ email: UserEmail });
    if (!user) {
        throw new AppError(404, 'User not found');
    }

    const isDeleted = user?.isDeleted;
    if (isDeleted) {
        throw new AppError(403, 'This user is deleted !');
    }
    const userStatus = user?.status;
    if (userStatus === 'blocked') {
        throw new AppError(403, 'This user is blocked ! !');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new AppError(401, 'Password is incorrect');
    }
    const jwtPayload = {
        userId: user?._id,
        role: user?.role,
        status: user?.status,
        isDeleted: user?.isDeleted,

    } as JwtPayload

    const accessToken = jwt.sign(jwtPayload,
        (config.jwt_access_secret as string),
        { expiresIn: 86400 });

    const refreshToken = jwt.sign(jwtPayload,
        (config.jwt_refresh_secret as string),
        { expiresIn: 5184000 });


    return { user, accessToken, refreshToken };
}


const changePassword = async (payload: IAuthChangePassword) => {
    const { email, oldPassword, newPassword } = payload;
    const UserEmail = email.toLowerCase();
    payload.email = UserEmail;
    const isUserExits = await userModel.findOne({ email: UserEmail });
    if (!isUserExits) {
        throw new AppError(404, 'User not found');
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, isUserExits.password);
    if (!isPasswordMatch) {
        throw new AppError(401, 'Password is incorrect');
    }
    const hashedPassword = await bcrypt.hash(newPassword, Number(config.bcrypt_salt_rounds));
    payload.password = hashedPassword;
    payload.passwordChangedAt = new Date();
    const user = await userModel.findByIdAndUpdate(isUserExits._id, payload, { new: true, runValidators: true });
    return user;
}



const requestPasswordReset = async (payload: IAuthRequestPasswordReset) => {
    const { email } = payload;

    const UserEmail = email.toLowerCase();


    const user = await userModel.findOne({ email: UserEmail });
    if (!user) {

        throw new AppError(404, 'User not found');

    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

    await userModel.findByIdAndUpdate(user._id, {
        passwordResetToken: resetTokenHash,
        passwordResetExpires: Date.now() + 60 * 60 * 1000,
        passwordChangedAt: new Date()
    });

    await sendResetPasswordEmail(user.email, resetToken);

    return { message: 'Password reset email sent' };
};



const resetPassword = async (token: string, payload: { newPassword: string }) => {

    const { newPassword } = payload

    const hashedToken = crypto.createHash('sha256').update(token as string).digest('hex');

    const user = await userModel.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
        throw new AppError(400, 'Token is invalid or has expired');
    }

    user.password = await bcrypt.hash(newPassword, Number(config.bcrypt_salt_rounds));
    user.passwordResetToken = '';
    user.passwordResetExpires = '';

    await user.save();

    return { message: 'Password reset successful' };
};

const refreshToken = async (token: string) => {
    const decoded = jwt.verify(token, config.jwt_refresh_secret as string) as JwtPayload
    const { userId, role, status, isDeleted, iat } = decoded
    const user = await userModel.findById(userId);

    if (!user) {
        throw new AppError(404, 'This user is not found !');
    }


    if (
        user.passwordChangedAt &&
        iat &&
        (user.passwordChangedAt.getTime() / 1000 < iat)
    ) {
        throw new AppError(401, 'You are not authorized !');
    }
    const accessToken = jwt.sign({ userId, role, status, isDeleted }, config.jwt_access_secret as string, { expiresIn: 86400 })
    return { accessToken }
}








export const AuthService = {
    register, login, changePassword, requestPasswordReset, resetPassword, refreshToken
}

