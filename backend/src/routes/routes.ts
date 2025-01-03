import { validationData } from "../middlewares/validationData";
import { loginSchema, registerSchema } from "../schemas/userSchemas";
import { register } from "../modules/user/controller/register";
import { otpCode } from "../modules/user/controller/otpCode";
import { login } from "../modules/user/controller/login";
import { verification } from "../modules/user/controller/verification";
import { refreshToken } from "../modules/user/controller/refreshToken";
import { validateToken } from "../middlewares/validateToken";
import express from "express";
import { logout } from "../modules/user/controller/logout";
import { strictLimiter } from "../middlewares/rateLimitting";
import { forgotPassword } from "../modules/user/controller/forgotPassword";
const router = express.Router();

router.post(
    "/register",
    strictLimiter,
    validationData(registerSchema),
    register
)

router.post("/login",
    strictLimiter,
    validationData(loginSchema),
    login
)

router.post("/logout",
    strictLimiter,
    validateToken,
    logout
)

router.post("/send-code",
    strictLimiter,
    validationData(registerSchema.pick({ email: true })),
    otpCode
)

router.post("/verification/:code(\\d{6})",
    strictLimiter,
    validationData(registerSchema.pick({ email: true })),
    verification
)

router.get("/refresh-token",
    strictLimiter,
    refreshToken
)

router.post("/forgot-password/:code(\\d{6})",
    strictLimiter,
    validationData(registerSchema.pick({ email: true, password: true })),
    forgotPassword
)

export { router };