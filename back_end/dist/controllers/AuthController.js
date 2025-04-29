import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}
export const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName, userType, phoneNumber, dateOfBirth, address, profileImage } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            userType,
            phoneNumber,
            dateOfBirth,
            address,
            profileImage: profileImage ?? null
        });
        if (userType === 'doctor') {
            await Doctor.create({ user: newUser._id });
        }
        else if (userType === 'patient') {
            await Patient.create({ user: newUser._id });
        }
        return res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password, userType } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'email or password are wrong' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'email or password are wrong' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
        return res.status(200).json({ token, user });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
