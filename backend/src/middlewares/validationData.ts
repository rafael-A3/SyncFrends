import { Request, Response, NextFunction } from "express";
import { ZodError, z } from "zod";
import { BadRequest } from "../utils/exceptions/exceptionHandler";

export const validationData = (schema: Zod.ZodTypeAny) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                const message = error.errors[0].message;
                throw new BadRequest(message);
            }

            else {
                const message = "Ops! An unexpected error occurred. Try again later";
                res.status(500).json({ error: message })
            }
        }
    };
}