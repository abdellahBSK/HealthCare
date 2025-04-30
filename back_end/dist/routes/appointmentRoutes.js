import express from 'express';
import { getHealthCategories, getHealthConditions, getSpecialistsForConditions, getDoctorsBySpecialty, getDoctorAvailability, createAppointment, getAppointmentDetails, cancelAppointment } from '../controllers/AppointmentController';
import { protect } from '../middlewares/authMiddleware';
const router = express.Router();
// Routes publiques
router.get('/health-categories', getHealthCategories);
router.get('/health-conditions', getHealthConditions);
router.get('/specialists', getSpecialistsForConditions);
router.get('/doctors', getDoctorsBySpecialty);
router.get('/availability/:doctorId', getDoctorAvailability);
// Routes protégées (nécessitent authentification)
router.post('/', protect, createAppointment);
router.get('/:id', protect, getAppointmentDetails);
router.put('/:id/cancel', protect, cancelAppointment);
export default router;
