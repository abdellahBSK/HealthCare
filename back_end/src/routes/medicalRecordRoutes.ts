import express from 'express';
import MedicalRecord from '../models/MedicalRecord';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const records = await MedicalRecord.find()
      .populate('patient')
      .populate('doctor')
      .populate('appointment');
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medical records', error });
  }
});


router.get('/patient/:patientId', async (req, res) => {
  try {
    const records = await MedicalRecord.find({ patient: req.params.patientId })
      .populate('doctor')
      .populate('appointment')
      .sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient medical records', error });
  }
});


router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const records = await MedicalRecord.find({ doctor: req.params.doctorId })
      .populate('patient')
      .populate('appointment')
      .sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor medical records', error });
  }
});


router.get('/:id', async (req, res): Promise<any> => {
  try {
    const record = await MedicalRecord.findById(req.params.id)
      .populate('patient')
      .populate('doctor')
      .populate('appointment');
    if (!record) {
      return res.status(404).json({ message: 'Medical record not found' });
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medical record', error });
  }
});


router.post('/', async (req, res) => {
  try {
    const newRecord = new MedicalRecord(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ message: 'Error creating medical record', error });
  }
});


router.put('/:id', async (req, res): Promise<any> => {
  try {
    const updatedRecord = await MedicalRecord.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedRecord) {
      return res.status(404).json({ message: 'Medical record not found' });
    }
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(400).json({ message: 'Error updating medical record', error });
  }
});


router.delete('/:id', async (req, res): Promise<any> => {
  try {
    const deletedRecord = await MedicalRecord.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      return res.status(404).json({ message: 'Medical record not found' });
    }
    res.status(200).json({ message: 'Medical record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting medical record', error });
  }
});

export default router;