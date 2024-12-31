import { z } from "zod";

const registerSchema = z.object({
    name:
        z.string({ message: "Name Is Requred" })
            .regex(/^[a-zA-ZÀ-ú\s]{3,50}$/, {
                message: "Name must contain 3 to 50 characters (letters/spaces)"
            }),

    username:
        z.string({ message: "Username Is Requred" })
            .regex(/^[a-z0-9_.-]{3,50}$/),

    email:
        z.string({ message: "Email Is Requred" })
            .email({ message: "Invalid Email Format" }),

    password:
        z.string({ message: "Password Is Requred" })
            .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z#?!@$%^&*\(\)\[\]\<\>\_\=\+-]).{8,16}$/, {
                message: "Password must contain at least a lowercase letter, number and a special character (#?!@$%^&*()[]<>_=+-)"
            })
})

const loginSchema = z.object({
    username: z.string().regex(/^[a-z0-9_.-]{3,50}$/).optional(),
    email: z.string().email().optional(),
    password: z.string().regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z#?!@$%^&*\(\)\[\]\<\>\_\=\+-]).{8,16}$/)
}).refine((data) => data.username || data.email, {
    message: "Either username or email must be provided",
    path: ["username"]
});

const resetPassSchema = z.string().regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z#?!@$%^&*\(\)\[\]\<\>\_\=\+-]).{8,16}$/)

export { registerSchema, loginSchema, resetPassSchema };