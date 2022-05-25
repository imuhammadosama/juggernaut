import express from 'express';
import Load from '../models/load.model.js';

const router = express.Router();

// Getting all loads
router.get('/', async (req, res) => {
  try {
    const data = await Load.find().sort({ _id: -1 });
    res.json({ message: 'Found!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

router.get('/dispatchTracking', async (req, res) => {
  try {
    const result = await Load.find().sort({ _id: -1 });
    const data = result.filter(
      (load) => load.status === 'Dispatched' || load.status === 'Active'
    );
    res.json({ message: 'Found!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});
router.get('/billingInvoice', async (req, res) => {
  try {
    const result = await Load.find().sort({ _id: -1 });
    const data = result.filter(
      (load) => load.status === 'Completed' || load.status === 'Pending'
    );
    res.json({ message: 'Found!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});
router.get('/business', async (req, res) => {
  try {
    const result = await Load.find().sort({ _id: -1 });
    const data = result;
    res.json({ message: 'Found!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});
router.get('/carrier', async (req, res) => {
  try {
    const result = await Load.find().sort([['modification_date', -1]]);
    const data = result.filter(
      (load) =>
        load.status === 'Dispatched' ||
        load.status === 'Active' ||
        load.status === 'Completed'
    );
    res.json({ message: 'Found!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

// Getting single load
router.get('/:loadId', async (req, res) => {
  try {
    const data = await Load.findOne({ _id: req.params.loadId });
    res.json({ message: 'Found!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

// Getting single load
router.get('/origin/:city', async (req, res) => {
  try {
    const data = await Load.find({
      // prettier-ignore
      'origin.address.city': req.params.city,
    });
    res.json({ message: 'Found!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

// Accept load
router.put('/accept/:loadId', async (req, res) => {
  try {
    const data = await Load.updateOne(
      { id: req.params.loadId },
      { $set: { amount: req.body.amount, status: 'Active' } }
    );
    res.json({ message: 'Load is now active!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

// Accept load
router.put('/pick/:loadId', async (req, res) => {
  try {
    const data = await Load.updateOne(
      { _id: req.params.loadId },
      {
        $set: {
          status: 'Dispatched',
          other_details: { shipper_id: req.body.client_id },
        },
      }
    );
    res.json({ message: 'Load is now dispatched!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

// Complete Load
router.put('/complete/:loadId', async (req, res) => {
  try {
    const data = await Load.updateOne(
      { id: req.params.loadId },
      { $set: { status: 'Completed' } }
    );
    res.json({ message: 'Load is complete!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

// Cancel load
// router.delete('/:loadId', async (req, res) => {
//   try {
//     const data = await Load.deleteOne({ _id: req.params.loadId });
//     res.json({ message: 'Load Successfully Cancelled!', status: 'ok', data });
//   } catch (error) {
//     res.json({ message: error, status: 'no' });
//   }
// });

router.put('/cancel/:loadId', async (req, res) => {
  try {
    const data = await Load.updateOne(
      { id: req.params.loadId },
      { $set: { amount: req.body.amount, status: 'Cancelled' } }
    );
    res.json({ message: 'Load is cancelled!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

router.put('/pick/:loadId', async (req, res) => {
  try {
    const data = await Load.updateOne(
      { _id: req.params.loadId },
      { $set: { status: 'Active' } }
    );
    res.json({ message: 'Load is activated!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

// Update tracking
router.route('/updateTrack/:loadId').put(async (req, res) => {
  console.log('Run');
  try {
    const data = await Load.updateOne(
      { id: req.params.loadId },
      {
        $push: {
          tracking_details: {
            city: req.body.tracking_details.city,
            province: req.body.tracking_details.province,
            date: req.body.tracking_details.date,
            time: req.body.tracking_details.time,
          },
        },
      }
    );
    console.log('apple');
    res.json({ message: 'Tracking is updated!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

router.get('/active/', async (req, res) => {
  try {
    const data = await Load.find({ status: 'Active' });
    res.json({ message: 'Found loads', status: 'ok' });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

router.post('/', async (req, res) => {
  const lastLoad = await Load.find({}).sort({ _id: -1 }).limit(1);
  const lastId = parseInt(lastLoad[0].id);
  const uniqueId = lastId + 1;

  const load = new Load({
    id: uniqueId,
    status: req.body.status,
    start_date: '2020-01-01T00:00:00.511Z',
    amount: 0,
    origin: {
      address: {
        line1: req.body.origin.address.line1,
        line2: req.body.origin.address.line2,
        city: req.body.origin.address.city,
        province: req.body.origin.address.province,
        postalcode: req.body.origin.postalcode,
      },
      date: req.body.origin.date,
      time: req.body.origin.time,
    },
    destination: {
      address: {
        line1: req.body.destination.address.line1,
        line2: req.body.destination.address.line2,
        city: req.body.destination.address.city,
        province: req.body.destination.adddress.province,
        postalcode: req.body.destination.postalcode,
      },
      date: req.body.destination.date,
      time: req.body.destination.time,
    },
    calculated_distance: 0,
    details: {
      distance: '200KM',
      trailer_type: req.body.details.trailer_type,
      trailer_axle: req.body.details.trailer_axle,
      full_or_partial: req.body.details.full_or_partial,
      capacity: {
        value: 0,
        unit: 'ltrs',
      },
      quantity: req.body.details.quantity,
      weight: {
        value: req.body.details.weight.value,
        unit: 'kgs',
      },
      volume: {
        value: req.body.details.volume.value,
        unit: 'cubicmeter',
      },
      comodity_description: req.body.details.comodity_description,
      quantity_description: req.body.details.quantity_description,
      notes: req.body.details.notes,
    },
    consignor: {
      name: req.body.consignor.name,
      phone: req.body.consignor.phone,
    },
    consignee: {
      name: req.body.consignee.name,
      phone: req.body.consignee.phone,
    },
    dispatched_document: {
      path: 'loads/dispatch_documents/jan/2021/dispatch_001.pdf',
    },
    invoice_document: {
      path: 'loads/invoice_documents/jan/2021/invoice_001.pdf',
    },
    tracking_details: {
      locations: [
        {
          origin: {
            city: 'Lahore',
            province: 'Punjab',
            date: '2022-01-01T00:00:00.511Z',
            time: '2022-01-01T00:00:00.511Z',
          },
        },
        {
          destination: {
            city: 'Karachi',
            province: 'Sindh',
            date: '2022-01-01T00:00:00.511Z',
            time: '2022-01-01T00:00:00.511Z',
          },
        },
        {
          location1: {
            city: 'Multan',
            province: 'Punjab',
            date: '2022-01-01T00:00:00.511Z',
            time: '2022-01-01T00:00:00.511Z',
          },
        },
        {
          location2: {
            city: 'Hyderabad',
            province: 'Sindh',
            date: '2022-01-01T00:00:00.511Z',
            time: '2022-01-01T00:00:00.511Z',
          },
        },
      ],
    },
    other_details: {
      business_id: '123456789',
      shipper_id: '1234567',
      amount_set_by: '1234567',
      tracked_by: '1234567',
    },
  });
  try {
    const data = await load.save();
    console.log(data);
    res.json({ message: 'Successfully Added!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

export default router;
