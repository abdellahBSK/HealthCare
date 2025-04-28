import express from 'express';
import userRoutes from './userRoutes';
import doctorRoutes from './doctorRoutes';
import patientRoutes from './patientRoutes';
import notificationRoutes from './notificationRoutes';
import healthFacilityRoutes from './healthFacilityRoutes';
import medicalRecordRoutes from './medicalRecordRoutes';
import reviewRoutes from './reviewRoutes';
import reportRoutes from './reportRoutes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/doctors', doctorRoutes);
router.use('/patients', patientRoutes);
router.use('/notifications', notificationRoutes);
router.use('/health-facilities', healthFacilityRoutes);
router.use('/medical-records', medicalRecordRoutes);
router.use('/reviews', reviewRoutes);
router.use('/reports', reportRoutes);

export default router;