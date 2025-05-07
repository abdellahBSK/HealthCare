import { Request, Response } from 'express';
import authService from '../services/AuthService.js';
import { AuthRequest } from '../middlewares/authMiddleware.js';

export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userData = {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      name: `${req.body.firstName} ${req.body.lastName}`, // For compatibility with AuthService
      userType: req.body.userType,
      phoneNumber: req.body.phoneNumber,
      dateOfBirth: req.body.dateOfBirth,
      address: req.body.address,
      profileImage: req.body.profileImage ?? null
    };

    const result = await authService.register(userData);

    return res.status(201).json({ 
      message: 'User registered successfully',
      token: result.token,
      user: result.user
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ 
      message: error instanceof Error ? error.message : 'Registration failed' 
    });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    console.log(req)
    const { email, password } = req.body;
   

    const result = await authService.login(email, password);

    return res.status(200).json({
      token: result.token,
      user: result.user
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error instanceof Error? error.message : 'Login failed' });
  }
};

export const verifyEmail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { token } = req.query;
    
    
    if (!token || typeof token !== 'string') {
      throw new Error('Invalid verification token');
    }
    const verifiedUser = await authService.verifyEmail(token);
  
    const authToken =  authService.generateToken(verifiedUser.id)
    
    return res.status(200).json({ 
      token: authToken,
      user: verifiedUser,
      success: verifiedUser.isVerified, 
      message: 'Email verified successfully' 
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error instanceof Error ? error.message : 'Email verification failed' });
  }
};

export const resendVerificationEmail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email } = req.body;
    
    const result = await authService.resendVerificationEmail(email);
    
    return res.status(200).json({ 
      message: result.message 
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to resend verification email' });
  }
};

export const forgotPassword = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email } = req.body;
    
    await authService.forgotPassword(email);
    
    return res.status(200).json({ 
      message: 'Password reset email sent' 
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to process forgot password request' });
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId, token, newPassword } = req.body;
    
    await authService.resetPassword(userId, token, newPassword);
    
    return res.status(200).json({ 
      message: 'Password reset successful' 
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to reset password' });
  }
};

export const getUserProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.params.id;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    const userProfile = await authService.getUserProfile(userId);
    
    return res.status(200).json(userProfile);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to get user profile' });
  }
};

export const changePassword = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.params.id;
    const { currentPassword, newPassword } = req.body;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    await authService.changePassword(userId, currentPassword, newPassword);
    
    return res.status(200).json({ 
      message: 'Password changed successfully' 
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to change password' });
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
   if(!req.user){
    return res.status(401).json({ message: 'Unauthorized' }); 
   } 

    const user = await authService.getUserProfile(req.user.userId);

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error instanceof Error? error.message : 'Failed to get user profile' }); 
  }
}
