// src/routes/index.ts
import express from 'express';
import authRoutes from './authRoutes';
import doctorRoutes from './doctorRoutes';
import patientRoutes from './patientRoutes';
import appointmentRoutes from './appointmentRoutes';
import healthFacilityRoutes from './healthFacilityRoutes';
import medicalRecordRoutes from './medicalRecordRoutes';
import notificationRoutes from './notificationRoutes';
import reportRoutes from './reportRoutes';
import reviewRoutes from './reviewRoutes';
import userRoutes from './userRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/doctors', doctorRoutes);
router.use('/patients', patientRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/health-facilities', healthFacilityRoutes);
router.use('/medical-records', medicalRecordRoutes);
router.use('/notifications', notificationRoutes);
router.use('/reports', reportRoutes);
router.use('/reviews', reviewRoutes);
router.use('/users', userRoutes);

export default router;