import express from 'express';
import Report from '../models/Report.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('reporter')
      .populate('reportedUser')
      .populate('solvedBy');
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error });
  }
});

router.get('/unsolved', async (req, res) => {
  try {
    const reports = await Report.find({ isSolved: false })
      .populate('reporter')
      .populate('reportedUser')
      .sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching unsolved reports', error });
  }
});


router.get('/:id', async (req, res): Promise<any> => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('reporter')
      .populate('reportedUser')
      .populate('solvedBy');
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching report', error });
  }
});


router.post('/', async (req, res) => {
  try {
    const newReport = new Report(req.body);
    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(400).json({ message: 'Error creating report', error });
  }
});


router.patch('/:id/solve', async (req, res): Promise<any> => {
  try {
    if (!req.body.solvedBy) {
      return res.status(400).json({ message: 'solvedBy field is required' });
    }
    
    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      { 
        isSolved: true, 
        solvedBy: req.body.solvedBy,
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    if (!updatedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }
    
    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(400).json({ message: 'Error updating report', error });
  }
});


router.delete('/:id', async (req, res): Promise<any> => {
  try {
    const deletedReport = await Report.findByIdAndDelete(req.params.id);
    if (!deletedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting report', error });
  }
});

export default router;