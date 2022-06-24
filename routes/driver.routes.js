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

// Update Status
router.put('/approve/:driverId', async (req, res) => {
  try {
    await Driver.updateOne(
      { _id: req.params.driverId },
      {
        $set: {
          status: 'Active',
        },
      }
    );
    res.json({ message: 'Driver is accepted!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

router.put('/reject/:driverId', async (req, res) => {
  try {
    await Driver.updateOne(
      { _id: req.params.driverId },
      {
        $set: {
          status: 'Pending',
        },
      }
    );
    res.json({ message: 'Driver is accepted!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

// Getting single driver
router.get('/:driverCnic', async (req, res) => {
  try {
    const data = await Driver.findOne({ _id: req.params.cnic });
    console.log(data);
    res.json({ message: 'Found!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

// Find Drivers by ClientId
router.get('/client/:clientId', async (req, res) => {
  try {
    const data = await Driver.find({
      'client.id': req.params.clientId,
    });
    console.log(req.params.clientId);
    res.json({ message: 'Found!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

// Posting a Vehicle
router.route('/').post(async (req, res) => {
  const driver = new Driver({
    cnic: req.body.cnic,
    status: 'Pending',
    name: req.body.name,
    father_name: req.body.father_name,
    phone: req.body.phone,
    licence_category: req.body.licence_category,
    licence_expiry: req.body.licence_expiry,
    insurance_policy: req.body.insurance_policy,
    health_condition: req.body.health_condition,
    upload_cnic: [req.body.upload_cnic],
    upload_licence: [req.body.upload_licence],
    client: {
      id: req.body.client.id,
      name: req.body.client.name,
    },
    approved_by: '0',
    rejected_by: '0',
  });
  console.log(req.body.client);
  try {
    const driverExists = await Driver.findOne({
      cnic: req.body.cnic,
    });
    if (driverExists) {
      res.json({ message: 'CNIC is already registered!', status: 'no' });
    } else {
      const data = await driver.save().then();
      res.json({ message: 'Succesfully Registered!', status: 'ok', data });
    }
  } catch (error) {
    res.json({ message: error });
    console.log(error);
  }
});

router.route('/').delete(async (req, res) => await Driver.deleteMany({}));

export default router;
