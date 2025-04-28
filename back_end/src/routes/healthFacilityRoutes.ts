import express, { Request, Response } from 'express';
import HealthFacility from '../models/HealthFacility';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    console.log(req.params);
    const facilities = await HealthFacility.find();
    res.status(200).json(facilities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching health facilities', error });
  }
});

router.get('/:id', async (req, res): Promise<any> => {
  try {
    const facility = await HealthFacility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json({ message: 'Health facility not found' });
    }
    return res.status(200).json(facility);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching health facility', error });
  }
});


router.post('/', async (req, res) => {
  try {
    const newFacility = new HealthFacility(req.body);
    const savedFacility = await newFacility.save();
    res.status(201).json(savedFacility);
  } catch (error) {
    res.status(400).json({ message: 'Error creating health facility', error });
  }
});


router.put('/:id', async (req, res): Promise<any> => {
  try {
    const updatedFacility = await HealthFacility.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFacility) {
      return res.status(404).json({ message: 'Health facility not found' });
    }
    res.status(200).json(updatedFacility);
  } catch (error) {
    res.status(400).json({ message: 'Error updating health facility', error });
  }
});


router.delete('/:id', async (req, res) : Promise<any> => {
  try {
    const deletedFacility = await HealthFacility.findByIdAndDelete(req.params.id);
    if (!deletedFacility) {
      return res.status(404).json({ message: 'Health facility not found' });
    }
    res.status(200).json({ message: 'Health facility deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting health facility', error });
  }
});

export default router;