import { prisma } from "../../../utils/prisma";
import { HashService } from "../../../utils/hashService";
import { NotFound } from "../../../utils/exceptions/exceptionHandler";
import { otpCode } from "../../../utils/otp/otp";
import { MailerService } from "../../../utils/mailer/mailerService";

export const otpCodeService = async (email: string) => {
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) throw new NotFound("Email Not Found");

    const hashService = new HashService();

    const { newOtpCode, otpCodeExp } = otpCode();
    const otpHashing = hashService.hashData(newOtpCode);

    await prisma.userAuth.update({
        where: { userId: user.id },
        data: {
            otpCode: otpHashing,
            otpCodeExp: otpCodeExp
        }
    });

    const mailerService = new MailerService();
    await mailerService.deliverEmail(user.name, user.email, newOtpCode);
}