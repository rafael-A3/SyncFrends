import transporter from "./mailer.config";
import hbs from "handlebars";
import * as path from "path";
import * as fs from "fs";

export class Mailer {
    private templateCompile(
        name: string,
        otpCode: string
    ) {
        const filePath = "src/utils/mailer/template/otp.code.template.hbs";
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