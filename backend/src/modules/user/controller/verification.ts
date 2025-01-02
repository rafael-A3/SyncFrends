import { Request, Response } from "express";
import { verificationService } from "../service/verificationController";

export const verification = async (req: Request, res: Response) => {
    const { code } = req.params
    const { email } = req.body

    await verificationService(email, code);
    res.status(200).json({
        success: true,
        message: "Verified! You're now able to login"
    })
}