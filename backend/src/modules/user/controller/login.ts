import { Request, Response } from "express";
import { loginService } from "../service/loginService";
import { ILoginUser } from "../../../interfaces/ILoginUser";

export const login = async (req: Request, res: Response) => {
    const { username, email, password }: ILoginUser = req.body

    const { accessToken, refreshToken } = await loginService({
        username, password, email
    });

    res.cookie("Authorization",
        JSON.stringify({
            accessToken: accessToken,
            refreshToken: refreshToken
        }), {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 72 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true })
}