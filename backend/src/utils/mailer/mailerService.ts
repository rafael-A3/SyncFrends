import { transporter } from "./mailerServiceConfig";
import hbs from "handlebars";
import * as path from "path";
import * as fs from "fs";

export class MailerService {
    private templateCompile(
        name: string,
        otpCode: string
    ) {
        const filePath = "src/utils/mailer/templates/otpCodeTemplate.hbs";
        const templatePath = path.join(process.cwd(), filePath);

        const templateFile = fs.readFileSync(templatePath, "utf-8");
        const template = hbs.compile(templateFile);

        return template({ name, otpCode })
    }

    async deliverEmail(
        name: string,
        email: string,
        otpCode: string
    ) {
        const template = this.templateCompile(name, otpCode);
        await transporter.sendMail({
            from: "itbreaksfast@gmail.com",
            to: email,
            html: template
        })
    }
}