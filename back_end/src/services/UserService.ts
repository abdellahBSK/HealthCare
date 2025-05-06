import User from '../models/User.js';
import mongoose from 'mongoose';
import { BaseService } from './BaseService.js';

export class UserService extends BaseService<any> {
  constructor() {
    super(User);
  }
  
  async findByEmail(email: string): Promise<any | null> {
    try {
      return await User.findOne({ email }).exec();
    } catch (error) {
      throw error;
    }
  }
  
  async updatePassword(userId: string, hashedPassword: string): Promise<any | null> {
    try {
      return await User.findByIdAndUpdate(
        userId,
        { password: hashedPassword },
        { new: true }
      ).exec();
    } catch (error) {
      throw error;
    }
  }
  
  async updateUserInfo(userId: string, updateData: Partial<any>): Promise<any | null> {
    try {
      // Ensure sensitive fields cannot be updated through this method
      const safeUpdateData = { ...updateData };
      delete safeUpdateData.password;
      delete safeUpdateData.userType;
      delete safeUpdateData.isVerified;
      
      return await User.findByIdAndUpdate(
        userId,
        safeUpdateData,
        { new: true }
      ).select('-password').exec();
    } catch (error) {
      throw error;
    }
  }
  
  async updateEmail(userId: string, newEmail: string): Promise<any | null> {
    try {
      // Check if email is already in use
      const existingUser = await this.findByEmail(newEmail);
      if (existingUser && existingUser._id.toString() !== userId) {
        throw new Error('Email is already in use');
      }
      
      // Update email and set isVerified to false
      return await User.findByIdAndUpdate(
        userId,
        { 
          email: newEmail,
          isVerified: false 
        },
        { new: true }
      ).select('-password').exec();
    } catch (error) {
      throw error;
    }
  }
  
  async updateUserStatus(userId: string, isActive: boolean): Promise<any | null> {
    try {
      return await User.findByIdAndUpdate(
        userId,
        { isActive },
        { new: true }
      ).select('-password').exec();
    } catch (error) {
      throw error;
    }
  }
  
  async getUserWithProfile(userId: string): Promise<any> {
    try {
      const user = await User.findById(userId).select('-password').exec();
      if (!user) {
        throw new Error('User not found');
      }
      
      let profile = null;
      if (user.userType === 'doctor') {
        profile = await mongoose.model('Doctor').findOne({ user: userId }).exec();
      } else if (user.userType === 'patient') {
        profile = await mongoose.model('Patient').findOne({ user: userId }).exec();
      }
      
      return {
        user,
        profile
      };
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();