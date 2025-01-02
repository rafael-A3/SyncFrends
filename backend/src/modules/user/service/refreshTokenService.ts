import "dotenv/config";
import { prisma } from "../../../utils/prisma";
import { NotFound, Unauthorized } from "../../../utils/exceptions/exceptionHandler";
import { JwtService } from "../../../utils/jwtService";
import { HashService } from "../../../utils/hashService";

export const refreshTokenService = async (refreshToken: string) => {
    const jwtService = new JwtService();
    const secret = process.env.REFRESHTOKEN_SECRET!;

    const decoded = jwtService.verifyToken(refreshToken, secret) as { sub: string };

    const user = await prisma.userAuth.findUnique({
        where: { userId: decoded.sub }
    });

    if (!user?.refreshToken) 
        throw new NotFound("Not Found. Sign in to get a new token");

    const hashService = new HashService();

    const isEqual = hashService.compareData(refreshToken, user.refreshToken);
    if(!isEqual) throw new Unauthorized("Unauthorized access");

    const accessToken = jwtService.createAccessToken(user.userId);
    return accessToken;
}