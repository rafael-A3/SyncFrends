import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { Unauthorized } from "../utils/exceptions/exceptionHandler";
import { JwtService } from "../utils/jwtService";

export const validateToken = (
    req: any,
    res: Response,
    next: NextFunction
) => {
    const secret = process.env.ACCESSTOKEN_SECRET
    const jwtService = new JwtService();

    const userCookies = req.cookies["Authorization"];
    if (!userCookies) return next(new Unauthorized("Authentication cookie is missing"));

    const accessToken = JSON.parse(userCookies).accessToken
    if (!accessToken) return next(new Unauthorized("Access Token Is Missing"));
    try {
        const decoded = jwtService.verifyToken(accessToken, secret!);
        req.user = { id: decoded.sub }
        next();
    } catch (error) {
        return next(new Unauthorized("Authentication failed"));
    }
};