import { Router } from 'express';
import { register, login,resendVerificationEmail,verifyEmail,getMe} from '../controllers/AuthController.js';
import auth from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/resend_verification',resendVerificationEmail);
router.get('/verify_email',verifyEmail);
router.get('/me',auth, getMe);

export default router;
