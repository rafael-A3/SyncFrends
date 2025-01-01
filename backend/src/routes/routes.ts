import { validationData } from "../middlewares/validationData";
import { loginSchema, registerSchema } from "../schemas/userSchemas";
import { registerController } from "../modules/auth/controller/registerController";
import { otpCodeController } from "../modules/auth/controller/otpController";
import express from "express";
import { loginController } from "../modules/auth/controller/loginController";
import { verificationController } from "../modules/auth/controller/verificationController";
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

router.post("/send-code",
    validationData(registerSchema.pick({ email: true })),
    otpCodeController
)

router.post("/verification/:code(\\d{6})",
    validationData(registerSchema.pick({ email: true })),
    verificationController
)

export { router };