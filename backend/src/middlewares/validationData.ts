import { Request, Response, NextFunction } from "express";
import { ZodError, z } from "zod";

export const validationData = (schema: Zod.ZodTypeAny) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                const message = error.errors[0].message;
                res.status(400).json({ error: "Invalid data", details: message })
            }

            else {
                const message = "Ops! An unexpected error occurred. Try again later";
                res.status(500).json({ error: message })
            }
        }
    };
}