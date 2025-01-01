import { prisma } from "../../../utils/prisma";
import { HashService } from "../../../utils/hashService";
import { Forbidden, NotFound, Unauthorized } from "../../../utils/exceptions/exceptionHandler";
import { compareAsc } from "date-fns";

export const verificationService = async (
    email: string,
    code: string
) => {
    const user = await prisma.user.findUnique({
        where: { email: email },
        select: {
            id: true,
            verified: true,
            auth: {
                select: {
                    otpCode: true,
                    otpCodeExp: true
                }
            }
        }
    });

    if (!user?.auth) throw new NotFound("Email Not Found");
    if (user.verified) throw new Forbidden("Email Already Verified");

    const expired = compareAsc(new Date(), new Date(user.auth.otpCodeExp!));
    if (expired === 1) throw new Unauthorized("OTP code has expired");

    const hashService = new HashService();

    const isCodeValid = hashService.compareData(code, user.auth.otpCode!);
    if (!isCodeValid) throw new Unauthorized("Incorrect OTP code");

    await prisma.user.update({
        where: { id: user.id },
        data: {
            verified: true,
            auth: {
                update: {
                    otpCode: null,
                    otpCodeExp: null
                }
            }
        }
    })
}