import { rateLimit } from "express-rate-limit";
import { Response, Request } from "express";

const handlerFunc = (req: Request, res: Response) => {
    res.status(429).json({
        success: false,
        message: "Too many request. Please try again later",
        path: req.url,
        timestamp: new Date().toISOString()
    })
}

const standardLimiter = rateLimit({
    limit: 80,
    windowMs: 720000,
    skipFailedRequests: true,
    handler: handlerFunc
})

const strictLimiter = rateLimit({
    limit: 6,
    windowMs: 60000,
    skipFailedRequests: true,
    handler: handlerFunc
})

export { standardLimiter, strictLimiter };