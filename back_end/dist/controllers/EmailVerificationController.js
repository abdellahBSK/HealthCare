import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
}
const resendCooldown = new Map();
const COOLDOWN_MS = 30 * 1000;
export const verifyEmail = async (req, res) => {
    const { token } = req.query;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user)
            return res.status(400).json({ message: "Invalid token" });
        if (user.isVerified)
            return res.status(200).json({ message: "Email already verified" });
        user.isVerified = true;
        await user.save();
        res
            .status(200)
            .json({ message: "Email verified successfully", user, token });
    }
    catch (error) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
};
export const reSendVerification = async (req, res) => {
    try {
        const emailParam = req.query.email;
        console.log(typeof emailParam);
        if (!emailParam || typeof emailParam !== "string") {
            return res
                .status(400)
                .json({ message: "The email is required and must be a string" });
        }
        const now = Date.now();
        const lastRequest = resendCooldown.get(emailParam) || 0;
        if (now - lastRequest < COOLDOWN_MS) {
            const secondsLeft = Math.ceil((COOLDOWN_MS - (now - lastRequest)) / 1000);
            return res
                .status(429)
                .json({ message: `Please wait ${secondsLeft}s before trying again.` });
        }
        resendCooldown.set(emailParam, now);
        const user = await User.findOne({ email: emailParam });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.isVerified) {
            return res.status(400).json({ message: "User already verified" });
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: "10m",
        });
        await sendVerificationEmail(emailParam, token);
        return res
            .status(200)
            .json({ message: "Verification email resent successfully" });
    }
    catch (error) {
        console.error("Resend verification error:", error);
        return res
            .status(500)
            .json({ message: "Server error during email resend" });
    }
};
