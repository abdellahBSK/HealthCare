import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
  }


export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { 
        email, 
        password, 
        firstName, 
        lastName, 
        role, 
        phoneNumber, 
        dateOfBirth,
        adress,
        profileImage} = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
      phoneNumber,
      dateOfBirth,
      adress,
      profileImage
    });

    await user.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);

    return res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
