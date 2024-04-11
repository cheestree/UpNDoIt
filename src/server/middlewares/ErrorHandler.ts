import {Request, Response, NextFunction, ErrorRequestHandler} from 'express';
import { InternalServerError, NotFoundError, Unauthorized } from '../models/error/Error'

export const ErrorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Content-Type', 'application/problem+json');

    //  console.error('Unhandled error:', err);

    let statusCode: number;
    let errorMessage: string;

    switch (err.constructor) {
        case NotFoundError:
            statusCode = (err as NotFoundError).status;
            errorMessage = (err as NotFoundError).name;
            break;
        case InternalServerError:
            statusCode = (err as InternalServerError).status;
            errorMessage = (err as InternalServerError).name;
            break;
        case Unauthorized:
            statusCode = (err as Unauthorized).status;
            errorMessage = (err as Unauthorized).name;
            break;
        default:
            statusCode = 500;
            errorMessage = 'Internal Server Error';
    }
    res.status(statusCode).json({ error: errorMessage, message: err.message });
}

export default ErrorHandler;
