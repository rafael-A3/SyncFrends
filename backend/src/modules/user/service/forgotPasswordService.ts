import { prisma } from "../../../utils/prisma";
import { BadRequest, NotFound, Unauthorized } from "../../../utils/exceptions/exceptionHandler";
import { IForgotPassword } from "../../../interfaces/IForgotPassword";
import { compareAsc } from "date-fns";
import { HashService } from "../../../utils/hashService";

export const forgotPasswordService = async (
    code: string,
    data: IForgotPassword
) => {
    const user = await prisma.user.findFirst({
        where: {
            AND: [
                { email: { equals: data.email } },
                { password: { not: null } }
            ]
        },
        select: {
            id: true,
            password: true,
            auth: {
                select: {
                    otpCode: true,
                    otpCodeExp: true
                }
            }
        }
    });
    
    if (!user) throw new NotFound("User Not Found");

    const hashService = new HashService();

    const samePass = hashService.compareData(data.newPassword, user.password!);
    if (samePass) throw new Unauthorized("New password cannot be equal to the previous one");

    const isCodeEqual = hashService.compareData(code, user.auth?.otpCode ?? "");
    if (!isCodeEqual) throw new BadRequest("Incorrect Validation Code");

    const expired = compareAsc(new Date(), new Date(user.auth!.otpCodeExp!));
    if (expired === 1) throw new BadRequest("Validation Code Has Expired");

    data.newPassword = hashService.hashData(data.newPassword);

    await prisma.user.update({
        where: { id: user.id },
        data: {
            password: data.newPassword,
            auth: {
                update: {
                    otpCode: null,
                    otpCodeExp: null,
                    refreshToken: null
                }
            }
        }
    })
}