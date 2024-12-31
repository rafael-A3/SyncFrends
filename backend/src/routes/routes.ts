import { validationData } from "../middlewares/validationData";
import { loginSchema, registerSchema } from "../schemas/userSchemas";
import { registerController } from "../modules/auth/controller/registerController";
import express from "express";
import { loginController } from "../modules/auth/controller/loginController";
const router = express.Router({ strict: true });

router.post(
    "/register",
    validationData(registerSchema),
    registerController
)

router.post("/login",
    validationData(loginSchema),
    loginController
)

export { router };