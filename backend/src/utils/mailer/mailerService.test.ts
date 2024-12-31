import { transporter } from "./mailerServiceConfig";
import { MailerService } from "./mailerService";

jest.mock("./mailerConfig", () => ({
    transporter: {
        sendMail: jest.fn(() => "ok")
    }
}))

describe("mailerService", () => {
    it("should be called with correct data", async () => {
        const mailer = new MailerService();
        await mailer.deliverEmail("Jhon", "jhon@example.com", "123456");

        expect(transporter.sendMail).toHaveBeenCalledTimes(1);
        expect(transporter.sendMail).toHaveBeenCalledWith({
            from: expect.any(String),
            to: "jhon@example.com",
            html: expect.stringContaining("123456")
        })
    })
})