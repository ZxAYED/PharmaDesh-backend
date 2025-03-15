/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from "../Error/AppError";
import CatchAsync from "../utils/CatchAsync";


const auth = (...requiredRoles: string[]) => {
    return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization

        if (!token) {
            throw new AppError(401, 'You are not authorized to access this route!');
        }
        try {
            const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload

            if (requiredRoles && !requiredRoles.includes(decoded.role)) {
                throw new AppError(401, 'You are not authorized to access this route!');
            }
            (req as any).user = decoded

        }
        catch (err: any) {
            throw new AppError(401, err.message);
        }
        next();
    });
}


export default auth;
