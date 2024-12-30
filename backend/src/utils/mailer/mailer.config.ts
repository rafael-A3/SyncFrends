import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    logger: true
})

transporter.verify((error, success) => {
    if (error) console.log(error)
})

export default transporter;