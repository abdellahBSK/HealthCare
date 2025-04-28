import express from 'express';
import Doctor from '../models/Doctor';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('user');
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error });
  }
});

router.get('/:id', async (req, res): Promise<any> => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('user');
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor', error });
  }
});


router.post('/', async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(400).json({ message: 'Error creating doctor profile', error });
  }
});


router.put('/:id', async (req, res): Promise<any> => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(400).json({ message: 'Error updating doctor profile', error });
  }
});


router.delete('/:id', async (req, res): Promise<any> => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json({ message: 'Doctor profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting doctor profile', error });
  }
});

export default router;