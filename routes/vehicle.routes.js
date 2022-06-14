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

// Getting Pending Vehicles

router.get('/status/:status', async (req, res) => {
  try {
    const data = await Vehicle.find({ status: req.params.status }).sort({
      _id: -1,
    });
    res.json({ message: 'Found!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

// Update Status
router.put('/approve/:vehicleId', async (req, res) => {
  try {
    await Vehicle.updateOne(
      { _id: req.params.vehicleId },
      {
        $set: {
          status: 'Active',
        },
      }
    );
    res.json({ message: 'Vehicle is accepted!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

// Update Status
router.put('/reject/:vehicleId', async (req, res) => {
  try {
    await Vehicle.updateOne(
      { _id: req.params.vehicleId },
      {
        $set: {
          status: 'Pending',
        },
      }
    );
    res.json({ message: 'Vehicle is rejected!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

// Find Drivers by ClientId
router.get('/client/:clientId', async (req, res) => {
  try {
    const data = await Vehicle.find({
      'client.id': req.params.clientId,
    });
    console.log(req.params.clientId);
    res.json({ message: 'Found!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

function uniqid(prefix = '', random = false) {
  const sec = Date.now() * 1000 + Math.random() * 1000;
  const id = sec.toString(16).replace(/\./g, '').padEnd(14, '0');
  return `SHARCKIFY${prefix}${id}${
    random ? `.${Math.trunc(Math.random() * 100000000)}` : ''
  }`;
}

// Posting a Vehicle
router.route('/').post(async (req, res) => {
  console.log(req.body);
  const vehicle = new Vehicle({
    registeration_number: req.body.registeration_number,
    status: 'Pending',
    make: req.body.make,
    year: req.body.year,
    trailer_axle: req.body.trailer_axle,
    chasis_number: req.body.chasis_number,
    engine_number: req.body.engine_number,
    insurance_policy: req.body.insurance_policy,
    file_documents: [''],
    upload_images: [''],
    client: { id: req.body.client.id, name: req.body.client.name },
    approved_by: '0',
    rejected_by: '0',
  });
  try {
    const vehicleExists = await Vehicle.findOne({
      registeration_number: req.body.registeration_number,
    });
    if (vehicleExists) {
      res.json({
        message: 'Registeration Number is already registered!',
        status: 'no',
      });
    } else {
      const data = await vehicle.save().then();
      console.log(data);
      res.json({ message: 'Succesfully Registered!', status: 'ok', data });
    }
  } catch (error) {
    res.json({ message: error });
  }
});

export default router;
