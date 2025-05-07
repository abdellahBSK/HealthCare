import express from 'express';
import { 
  getDashboardStats, 
  getRecentUsers, 
  getRecentAppointments, 
  getRevenueData,
  verifyDoctor,
  rejectDoctor,
  getPendingDoctors
} from '../controllers/AdminController';
import { protect, restrictTo } from '../middleware/authMiddleware';

const router = express.Router();

// Protéger toutes les routes admin
router.use(protect);
router.use(restrictTo('admin'));

// Routes du tableau de bord
router.get('/dashboard/stats', getDashboardStats);
router.get('/dashboard/recent-users', getRecentUsers);
router.get('/dashboard/recent-appointments', getRecentAppointments);
router.get('/dashboard/revenue-data', getRevenueData);

// Routes de gestion des médecins
router.get('/doctors/pending', getPendingDoctors);
router.patch('/doctors/:doctorId/verify', verifyDoctor);
router.patch('/doctors/:doctorId/reject', rejectDoctor);

export default router;