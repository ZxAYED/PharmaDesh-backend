/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { IErrorSources, IGenericErrorResponse } from "../interfaces/error.interface";
import { ZodError } from "zod";
import mongoose from "mongoose";
import AppError from "./AppError";

const globalErrorHandler = (
    err: IGenericErrorResponse,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = 500;
    let message = "You have made a Huge Sin!";
    let errorSource: IErrorSources[] = [{ path: '', message }];
    let stack = ''
    if (err instanceof ZodError) {

        statusCode = 400;
        message = "Validation failed";
        errorSource = err.issues.map((issue) => ({

            path: issue.path.join('.') || '',
            message: issue.message,
        }));
        stack = err.stack || '';
    }

    else if (err?.name === 'CastError') {
        statusCode = 400;
        message = `Invalid ${err?.path}: ${err?.value}`;
        stack = err.stack || '';
    }
    else if (err instanceof mongoose.Error.ValidationError) {
        statusCode = 400;
        message = "Validation Error";
        errorSource = Object.values(err.errors).map((error) => ({
            path: error?.path || '',
            message: error?.message || 'Unknown Mongoose Validation error',
        }));

    }
    else if (err?.code === 11000) {
        statusCode = 400;
        const match = err.message.match(/"([^"]*)"/);
        const extractedMessage = match && match[1];
        errorSource = [{ path: '', message: `${extractedMessage} already exists` }];
        message = "Duplicate Key Error";
        stack = err.stack || '';
    }
    else if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
        errorSource = err.errorSources;
        stack = err.stack || '';
    }
    else if (err instanceof Error) {
        statusCode = 400;
        message = err.message;
        stack = err.stack || '';
    }

    return res.json({
        message,
        statusCode,
        success: false,
        errorSource,
        stack
    });
};

export default globalErrorHandler;
