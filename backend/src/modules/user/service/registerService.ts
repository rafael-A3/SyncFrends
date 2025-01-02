import { prisma } from "../../../utils/prisma";
import { IRegisterUser } from "../../../interfaces/IRegisterUser";
import { HashService } from "../../../utils/hashService";
import { Conflict } from "../../../utils/exceptions/exceptionHandler";
import { otpCode } from "../../../utils/otp/otp";
import { MailerService } from "../../../utils/mailer/mailerService";

export const registerService = async (data: IRegisterUser) => {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (user?.email) throw new Conflict("Email Already Registered");

    const hash = new HashService();
    const userOtpCode = otpCode();
    const mailer = new MailerService();

    data.password = hash.hashData(data.password);
    const hashedOtpCode = hash.hashData(userOtpCode.newOtpCode);

    const newUser = await prisma.user.create({
        data: {
            ...data,
            auth: {
                create: {
                    otpCode: hashedOtpCode,
                    otpCodeExp: userOtpCode.otpCodeExp
                }
            }
        }
    });

    await mailer.deliverEmail(newUser.name, newUser.email, userOtpCode.newOtpCode);
    return newUser.email;
}