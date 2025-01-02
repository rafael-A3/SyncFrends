import { ExceptionHandler } from "./exceptionHandler";
import { Response, Request, NextFunction } from "express";

export const GlobalHandler = (
    error: ExceptionHandler,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const message = error.statusCode !== 500
        ? error.message
        : "Internal Error Due To Misconfiguration";

    const statusCode = error.statusCode || 500;
    if (statusCode === 500) console.log(error);

    res.status(statusCode).json({
        message,
        statusCode,
        path: req.url,
        timestamp: new Date().toISOString()
    });
}