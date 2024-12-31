import randomString from "randomstring";
import { addMinutes } from "date-fns";

export const otpCode = () => {
    const newOtpCode = randomString.generate({
        length: 6,
        charset: "numeric",
    })

    const otpCodeExp = addMinutes(new Date(), 10);
    return { newOtpCode, otpCodeExp };
}