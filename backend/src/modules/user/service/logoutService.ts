import { prisma } from "../../../utils/prisma";

export const logoutService = async (id: string) => {
    await prisma.userAuth.update({
        where: { userId: id },
        data: {
            refreshToken: null,
            otpCode: null,
            otpCodeExp: null
        }
    });

}