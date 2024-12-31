import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { IRegisterUser } from "../../../interfaces/IRegisterUser";
import { registerService } from "../service/registerService";

export const registerController = async (req: Request, res: Response) => {
    const userData = { id: uuid(), ...req.body } as IRegisterUser;

    const newUserEmail = await registerService(userData);
    res.status(201).json({
        success: true,
        email: newUserEmail
    });
}