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
router.get('/business/:businessId', async (req, res) => {
  try {
    const result = await Load.find().sort({ _id: -1 });
    const data = result.filter(
      (load) => load.business_id === req.params.businessId
    );
    res.json({ message: 'Found!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});
router.get('/carrier/:carrierId', async (req, res) => {
  try {
    const result = await Load.find().sort([['modification_date', -1]]);
    const d1 = result.filter((load) => load.status === 'Active');
    const d2 = result.filter(
      (load) => load.carrier_id === req.params.carrierId
    );
    if (d2 === []) {
      const data = d1;
      res.json({ message: 'Found!', status: 'ok', data });
    } else {
      const data = [...d1, ...d2];

      res.json({ message: 'Found!', status: 'ok', data });
    }
    console.log(d2);
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

// Getting single load
router.get('/destination/:city', async (req, res) => {
  try {
    const data = await Load.find({
      // prettier-ignore
      'destination.address.city': req.params.city,
    });
    res.json({ message: 'Found!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

// Getting single load
router.get('/vehicle/:vehicle', async (req, res) => {
  console.log(req.params.vehicle);
  try {
    const data = await Load.find({
      // prettier-ignore
      'details.trailer_type': req.params.vehicle,
    }).sort({ _id: -1 });

    res.json({ message: 'Found!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

// Getting single load
router.get('/commodity/:commodity', async (req, res) => {
  console.log(req.params.commodity);
  try {
    const data = await Load.find({
      commodity: req.params.commodity,
    }).sort({ _id: -1 });

    res.json({ message: 'Found!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

// Getting single load
router.get('/businessName/:business', async (req, res) => {
  console.log('Apple');
  try {
    const data = await Load.find({
      business_name: req.params.business,
    }).sort({ _id: -1 });

    res.json({ message: 'Found!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

// Getting single load
router.get('/carrierName/:carrier', async (req, res) => {
  console.log('Apple');
  try {
    const data = await Load.find({
      carrier_name: req.params.carrier,
    }).sort({ _id: -1 });

    res.json({ message: 'Found!', status: 'ok', data });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

// Accept load
router.put('/accept/:loadId', async (req, res) => {
  try {
    const data = await Load.updateOne(
      { _id: req.params.loadId },
      {
        $set: {
          amount: req.body.amount,
          status: 'Active',
          distance: `${req.body.distance} km`,
          amount_set_by: req.body.amount_set_by,
        },
      }
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
          carrier_id: req.body.carrier_id,
          carrier_name: req.body.carrier_name,
          driver_name: req.body.driver_name,
          vehicle_registeration_number: req.body.vehicle_registeration_number,
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
      { _id: req.params.loadId },
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
      { $set: { status: 'Active', carrier_id: req.body.carrier_id } }
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
      { _id: req.params.loadId },
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

  const lastId = parseInt(lastLoad[0].id.slice(2));
  const uniqueId = lastId + 1;

  const load = new Load({
    id: `JD${uniqueId}`,
    status: req.body.status,
    start: new Date(),
    amount: 0,
    origin: {
      address: {
        line1: req.body.origin.address.line1,
        line2: req.body.origin.address.line2,
        city: req.body.origin.address.city,
        province: req.body.origin.address.province,
        postalcode: req.body.origin.postalcode,
      },
      date_and_time: req.body.origin.date_and_time,
    },
    destination: {
      address: {
        line1: req.body.destination.address.line1,
        line2: req.body.destination.address.line2,
        city: req.body.destination.address.city,
        province: req.body.destination.address.province,
        postalcode: req.body.destination.postalcode,
      },
      date_and_time: req.body.destination.date_and_time,
    },
    distance: 'Not set yet!',
    commodity: req.body.commodity,
    details: {
      trailer_type: req.body.details.trailer_type,
      trailer_axle: req.body.details.trailer_axle,
      full_or_partial: req.body.details.full_or_partial,
      capacity: {
        value: req.body.details.capacity.value,
        unit: req.body.details.capacity.unit,
      },
      quantity: req.body.details.quantity,
      weight: {
        value: req.body.details.weight.value,
        unit: req.body.details.weight.unit,
      },
      volume: {
        value: req.body.details.volume.value,
        unit: req.body.details.volume.unit,
      },
      commodity_description: req.body.details.commodity_description,
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
    tracking_details: [],
    driver_name: 'Not set yet!',
    vehicle_registeration_number: 'Not set yet!',
    business_id: req.body.business_id,
    business_name: req.body.business_name,
    carrier_id: 'Not set yet!',
    carrier_name: 'Not set yet!',
    amount_set_by: 'Not set yet!',
    tracked_by: 'Not set yet!',
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
