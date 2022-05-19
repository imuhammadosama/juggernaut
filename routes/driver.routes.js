import express from 'express';

import Driver from '../models/driver.model.js';

const router = express.Router();

// Getting all drivers
router.get('/', async (req, res) => {
  try {
    console.log('working driver');
    const data = await Driver.find().sort({ _id: -1 });
    res.json({ message: 'Found!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

// Getting single driver
router.get('/:driverId', async (req, res) => {
  try {
    const data = await Driver.findOne({ _id: req.params.loadId });
    res.json({ message: 'Found!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

export default router;
