import express from 'express';
import Notification from '../models/Notification.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find().populate('recipient');
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
});


router.get('/user/:userId', async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('recipient');
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user notifications', error });
  }
});

router.get('/:id', async (req, res): Promise<any> => {
  try {
    const notification = await Notification.findById(req.params.id).populate('recipient');
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notification', error });
  }
});


router.post('/', async (req, res) => {
  try {
    const newNotification = new Notification(req.body);
    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    res.status(400).json({ message: 'Error creating notification', error });
  }
});


router.patch('/:id/read', async (req, res): Promise<any> => {
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!updatedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(400).json({ message: 'Error updating notification', error });
  }
});


router.delete('/:id', async (req, res): Promise<any> => {
  try {
    const deletedNotification = await Notification.findByIdAndDelete(req.params.id);
    if (!deletedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting notification', error });
  }
});

export default router;