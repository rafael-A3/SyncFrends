import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { IRegisterUser } from "../../../interfaces/IRegisterUser";
import { registerService } from "../service/registerService";

export const register = async (req: Request, res: Response) => {
    const { name, username, email, password }: IRegisterUser = req.body
    const userData = { id: uuid(), name, username, email, password };
    const newUserEmail = await registerService(userData);
    res.status(201).json({
        success: true,
        email: newUserEmail
    });
}