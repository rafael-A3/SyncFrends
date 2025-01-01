import { z } from "zod";

const registerSchema = z.object({
    name:
        z.string({ message: "Name Is Requred" })
            .regex(/^[a-zA-ZÀ-ú\s]{3,50}$/, {
                message: "Name must contain 3 to 50 characters (letters/spaces)"
            })
            .trim(),

    username:
        z.string({ message: "Username Is Requred" })
            .toLowerCase()
            .regex(/^[a-z0-9_.-]{3,50}$/, {
                message: "Username is 3 to 50 and accepts letters, numbers and (_.-)"
            }),

    email:
        z.string({ message: "Email Is Requred" })
            .email({ message: "Invalid Email Format" }),

    password:
        z.string({ message: "Password Is Requred" })
            .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9&%$#@])[A-Za-z0-9&%$#@]{8,16}$/
                , {
                    message: "Password must match /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9&%$#@])[A-Za-z0-9&%$#@]{8,16}$/"
                })
            .trim()
})

const loginSchema = z.object({
    username:
        z.string()
            .toLowerCase()
            .regex(/^[a-z0-9_.-]{3,50}$/, {
                message: "Username is 3 to 50 and accepts letters, numbers and (_.-)"
            })
            .trim()
            .optional(),

    email: z.string()
        .email()
        .optional(),

    password:
        z.string()
            .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9&%$#@])[A-Za-z0-9&%$#@]{8,16}$/, {
                message: "Password must match /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9&%$#@])[A-Za-z0-9&%$#@]{8,16}$/"
            })
            .trim()

}).refine((data) => data.username || data.email, {
    message: "Either username or email must be provided",
    path: ["username"]
});

export { registerSchema, loginSchema };