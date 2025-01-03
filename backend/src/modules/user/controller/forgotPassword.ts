import { Request, Response } from "express";
import { IForgotPassword } from "../../../interfaces/IForgotPassword";
import { forgotPasswordService } from "../service/forgotPasswordService";

export const forgotPassword = async (req: Request, res: Response) => {
    const { password: newPassword, email }: IForgotPassword = req.body
    const { code } = req.params

    await forgotPasswordService(code, { newPassword, email });
    res.status(200).json({ success: true })
}