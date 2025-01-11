import { Request, Response, NextFunction } from 'express';

interface HttpError extends Error {
    status?: number;
    errors?: any;
}

class APIError extends Error {
    errors: any;
    status: number;

    constructor({ message, errors = null, status = 500 }: { message: string; errors?: any; status?: number }) {
        super(message);
        this.name = this.constructor.name;
        this.errors = errors;
        this.status = status;
    }
}

type ErrorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => void;

const handler: ErrorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const isKnownError = err instanceof APIError;

    // Log the error for debugging
    console.error(`[Error]: ${err.message}`, {
        method: req.method,
        url: req.url,
        statusCode,
        stack: err.stack,
    });

    // Respond to the client
    res.status(statusCode).json({
        error: true,
        code: statusCode,
        message: isKnownError ? err.message : 'Internal Server Error',
        details: isKnownError ? (err as APIError).errors : null,
    });
};

export { APIError };
export default handler;
