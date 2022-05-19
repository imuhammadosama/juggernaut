import express from 'express';
import Vehicle from '../models/vehicle.model.js';

const router = express.Router();

// Getting all vehicles
router.get('/', async (req, res) => {
  try {
    const data = await Vehicle.find().sort({ _id: -1 });
    res.json({ message: 'Found!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

// Getting single vehicle
router.get('/:vehicleId', async (req, res) => {
  try {
    const data = await Vehicle.findOne({ _id: req.params.loadId });
    res.json({ message: 'Found!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

export default router;
