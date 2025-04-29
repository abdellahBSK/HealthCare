import Patient from '../models/Patient.js';
import { Request, Response } from 'express';

// Get all patients
export const getAllPatients = async (req: Request, res: Response) => {
  try {
    const patients = await Patient.find().populate('user');
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error });
  }
};

// Get patient by ID
export const getPatientById = async (req: Request, res: Response) => {
  try {
    const patient = await Patient.findById(req.params.id).populate('user');
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient', error });
  }
};

// Create new patient
export const createPatient = async (req: Request, res: Response) => {
  try {
    const newPatient = new Patient(req.body);
    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(400).json({ message: 'Error creating patient profile', error });
  }
};

// Update patient
export const updatePatient = async (req: Request, res: Response) => {
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
};

// Delete patient
export const deletePatient = async (req: Request, res: Response) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting patient profile', error });
  }
};