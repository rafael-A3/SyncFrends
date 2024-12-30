import { z } from "zod";

const registerSchema = z.object({
    photo: z.string().optional(),
    name: z.string().regex(/^[a-zA-ZÀ-ú0-9\s]{3,50}$/),
    username: z.string().regex(/^[a-z0-9_.-]{3,50}$/),
    email: z.string().email(),
    password: z.string().regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z#?!@$%^&*\(\)\[\]\<\>\_\=\+-]).{8,16}$/).optional()
})

const loginSchema = z.object({
    username: z.string().regex(/^[a-z0-9_.-]{3,50}$/).optional(),
    email: z.string().email().optional(),
    password: z.string().regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z#?!@$%^&*\(\)\[\]\<\>\_\=\+-]).{8,16}$/)
}).refine((data) => data.username || data.email, {
    message: "Either username or email must be provided",
    path: ["username"]
});

const resetPassSchema = z.string().regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z#?!@$%^&*\(\)\[\]\<\>\_\=\+-]).{8,16}$/).optional()

export { registerSchema, loginSchema, resetPassSchema };