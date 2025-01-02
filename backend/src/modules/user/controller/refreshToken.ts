import { Request, Response } from "express";
import { refreshTokenService } from "../service/refreshTokenService";
import { Unauthorized } from "../../../utils/exceptions/exceptionHandler";

export const refreshToken = async (req: Request, res: Response) => {
    const userCookies = req.cookies["Authorization"];
    if(!userCookies) throw new Unauthorized("Authorization cookie is missing");

    const refreshToken = JSON.parse(userCookies).refreshToken
    const accessToken = await refreshTokenService(refreshToken);
    res.cookie("Authorization",
        JSON.stringify({
            accessToken,
            refreshToken
        }), {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 72 * 60 * 60 * 1000,
    })

    res.status(200).json({ success: true, })
}