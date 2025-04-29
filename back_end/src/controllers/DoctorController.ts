import Doctor from '../models/Doctor';
import { Request, Response } from 'express';

// Get all doctors
export const getAllDoctors = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctors = await Doctor.find().populate('user');
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error });
  }
};

// Get doctor by ID
export const getDoctorById = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('user');
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor', error });
  }
};

// Create new doctor
export const createDoctor = async (req: Request, res: Response): Promise<void> => {
  try {
    const newDoctor = new Doctor(req.body);
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(400).json({ message: 'Error creating doctor profile', error });
  }
};

// Update doctor
export const updateDoctor = async (req: Request, res: Response): Promise<Response | void> => {
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
};

// Delete doctor
export const deleteDoctor = async (req: Request, res: Response): Promise<Response> => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    return res.status(200).json({ message: 'Doctor profile deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting doctor profile', error });
  }
};