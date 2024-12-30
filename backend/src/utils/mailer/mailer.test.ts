import { transporter } from "./mailerConfig";
import { Mailer } from "./mailer";

jest.mock("./mailerConfig", () => ({
    transporter: {
        sendMail: jest.fn(() => "ok")
    }
}))

describe("mailer", () => {
    it("should be called with correct data", async () => {
        const mailer = new Mailer();
        await mailer.deliverEmail("Jhon", "jhon@example.com", 123456);

        expect(transporter.sendMail).toHaveBeenCalledTimes(1);
        expect(transporter.sendMail).toHaveBeenCalledWith({
            from: expect.any(String),
            to: "jhon@example.com",
            html: expect.stringContaining("123456")
        })
    })
})