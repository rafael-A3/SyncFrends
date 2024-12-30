import randomString from "randomstring";
import { addMinutes } from "date-fns";

export const otpCode = () => {
    const otpCode = randomString.generate({
        length: 6,
        charset: "numeric",
    })

    const otpCodeExp = addMinutes(new Date(), 2);
    return { otpCode, otpCodeExp };
}