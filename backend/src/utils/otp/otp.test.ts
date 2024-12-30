import { otpCode } from "./otp";

describe("otpCode", () => {
    it("should return otp code and its expiration", () => {
        const otp = otpCode();

        expect(otp.otpCode).toHaveLength(6)
        expect(typeof otp.otpCode).toBe("string")
        expect(otp.otpCodeExp).toBeInstanceOf(Date)
    })
})