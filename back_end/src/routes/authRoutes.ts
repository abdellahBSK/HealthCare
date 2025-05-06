import { Router } from 'express';
import { register, login,resendVerificationEmail,verifyEmail } from '../controllers/AuthController.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/resend_verification',resendVerificationEmail);
router.get('/verify_email',verifyEmail);

export default router;
