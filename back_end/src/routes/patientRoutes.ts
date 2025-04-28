import express from 'express';
import Patient from '../models/Patient.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find().populate('user');
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error });
  }
});


router.get('/:id', async (req, res): Promise<any> => {
  try {
    const patient = await Patient.findById(req.params.id).populate('user');
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient', error });
  }
});


router.post('/', async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(400).json({ message: 'Error creating patient profile', error });
  }
});


router.put('/:id', async (req, res): Promise<any> => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(400).json({ message: 'Error updating patient profile', error });
  }
});


router.delete('/:id', async (req, res): Promise<any> => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting patient profile', error });
  }
});

export default router;