import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}
export const verifyEmail = async (req, res) => {
    const { token } = req.query;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user)
            return res.status(400).json({ message: 'Invalid token' });
        if (user.isVerified)
            return res.status(200).json({ message: 'Email already verified' });
        user.isVerified = true;
        await user.save();
        res.status(200).json({ message: 'Email verified successfully' });
    }
    catch (error) {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
};
