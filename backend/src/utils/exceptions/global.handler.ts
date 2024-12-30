import { ExceptionHandler } from "./exception.handler";
import { Response, Request, NextFunction } from "express";

export const GlobalHandler = (
    error: ExceptionHandler,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const message = error.statusCode !== 500
        ? error.message
        : "Ops! An unexpected error occurred. Try again later";

    const statusCode = error.statusCode || 500;
    if (statusCode === 500) console.log(error);

    res.status(statusCode).json({
        message,
        statusCode,
        path: req.url,
        timestamp: new Date().toISOString()
    });
}