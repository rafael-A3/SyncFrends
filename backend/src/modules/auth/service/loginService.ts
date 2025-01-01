import { prisma } from "../../../utils/prisma";
import { HashService } from "../../../utils/hashService";
import { NotFound, Unauthorized } from "../../../utils/exceptions/exceptionHandler";
import { ILoginUser } from "../../../interfaces/ILoginUser";
import { JwtService } from "../../../utils/jwtService";

export const loginService = async (data: ILoginUser) => {
    const whereclause = data.email
        ? { email: data.email }
        : { username: data.username };

    const user = await prisma.user.findUnique({ where: whereclause });
    if (!user) throw new NotFound("Email Not Found");
    if (!user.verified) throw new Unauthorized("Unverified Email Address");

    const jwtService = new JwtService();
    const hashService = new HashService();

    const accessToken = jwtService.createAccessToken(user.id);
    const refreshToken = jwtService.createRefreshToken(user.id);

    const hashedRt = hashService.hashData(refreshToken);

    await prisma.userAuth.update({
        where: { userId: user.id },
        data: { refreshToken: hashedRt }
    });

    return { accessToken, refreshToken };
}