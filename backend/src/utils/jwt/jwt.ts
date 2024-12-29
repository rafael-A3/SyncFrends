import "dotenv/config";
import jwt from "jsonwebtoken";

export class Jwt {
    private readonly accessTokenSecret = process.env.ACCESSTOKEN_SECRET as string
    private readonly refreshTokenSecret = process.env.REFRESHTOKEN_SECRET as string

    createAccessToken(id: string) {
        return jwt.sign({
            sub: id,
            date: new Date(),
        }, this.accessTokenSecret, {
            expiresIn: "30m"
        })
    }

    createRefreshToken(id: string) {
        return jwt.sign({
            sub: id,
        }, this.refreshTokenSecret, {
            expiresIn: "3d"
        })
    }
}