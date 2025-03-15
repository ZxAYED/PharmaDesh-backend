/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IErrorSources {
    path: string | number;
    message: string;
};

export interface IGenericErrorResponse {
    value?: any;
    code?: number;
    name?: string;
    path?: string | number | undefined;
    statusCode: number;
    message: string;
    errorSources: IErrorSources[];
    stack?: string;
};
