import { Router } from 'express';
import { register, login } from '../controllers/AuthController.js';
import { verifyEmail } from '../controllers/EmailVerificationController.js';
const router = Router();
router.post('/register', register);
router.post('/login', login);
router.get('/verify_email', verifyEmail);
export default router;
