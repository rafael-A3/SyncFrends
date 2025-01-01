import { Request, Response } from "express";
import { otpCodeService } from "../service/otpService";

export const otpCodeController = async (req: Request, res: Response) => {
    const { email } = req.body;
    await otpCodeService(email);
    res.status(200).json({
        success: true,
        message: `We sent an OTP code to: ${email}`
    });
}