import express from 'express';
import Client from '../models/client.model.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.json(await Client.find().sort({ _id: -1 }));
  } catch (error) {
    res.json({ error });
  }
});

router.post('/', async (req, res) => {
  const lastClient = await Client.find({}).sort({ _id: -1 }).limit(1);
  const lastId = parseInt(lastClient[0].id);
  const uniqueId = lastId + 1;

  const client = new Client({
    id: uniqueId,
    status: 'Pending',
    type: req.body.type,
    name: req.body.name,
    ntn: req.body.ntn,
    strn: req.body.strn,
    email: req.body.email,
    address: {
      line1: req.body.address.line1,
      line2: req.body.address.line2,
      city: req.body.address.city,
      province: req.body.address.province,
      zipcode: req.body.address.zipcode,
    },
    authorize_person_name: req.body.authorize_person_name,
    authorize_person_phone: req.body.authorize_person_phone,
    commodity: req.body.commodity,
    isSuspended: {
      status: false,
      suspended_period: '1',
    },
    isBlacklisted: {
      status: false,
    },
    other_details: {
      approved_by: '0',
      suspended_by: '0',
      blacklisted_by: '0',
    },
  });
  try {
    const data = await client.save();
    console.log(req);
    res.json({
      message: 'Registered! On approval, we will send you the logins.',
      status: 'ok',
      data,
    });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

// Accept Client
router.put('/accept/:clientId', async (req, res) => {
  try {
    const data = await Client.updateOne(
      { _id: req.params.clientId },
      { $set: { status: 'Active' } }
    );
    res.json({ message: 'Client is now active!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

// Suspend Client
router.put('/suspend/:clientId', async (req, res) => {
  try {
    const data = await Client.updateOne(
      { _id: req.params.clientId },
      { $set: { status: 'Suspended' } }
    );
    res.json({ message: 'Client is now suspended!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

export default router;
