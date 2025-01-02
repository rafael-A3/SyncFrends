import { Response } from "express";
import { logoutService } from "../service/logoutService";

export const logout = async (req: any, res: Response) => {
    const { id } = req.user
    await logoutService(id);
    res.clearCookie("Authorization");
    res.status(200).json({ success: true })
}