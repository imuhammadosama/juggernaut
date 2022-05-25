import express from 'express';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.route('/').get(async (req, res) => {
  try {
    res.json(await User.find());
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

router.route('/register').post(async (req, res) => {
  const user = new User({
    id: '123456789',
    company: {
      id: req.body.company.id,
      name: req.body.company.name,
    },
    name: req.body.name,
    cnic: req.body.cnic,
    father_name: req.body.father_name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    type: req.body.type,
    designation: req.body.designation,
    address: {
      line1: req.body.address.line1,
      line2: req.body.address.line2,
      city: req.body.address.city,
      province: req.body.address.province,
      postalcode: req.body.address.postalcode,
    },
    emergency: {
      name: req.body.emergency.name,
      relation: req.body.emergency.relation,
      phone: req.body.emergency.phone,
    },
    other_details: { added_by: req.body.other_details.added_by },
  });
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      res.json({ message: 'Email already used!', status: 'no' });
    } else {
      const data = await user.save();
      res.json({ message: 'Succesfully Registered!', status: 'ok', data });
    }
  } catch (error) {
    res.json({ message: error });
    console.log(error);
  }
});

router.route('/login').post(async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
          type: user.type,
          company: user.company.id,
        },
        'secret123'
      );
      console.log(user);
      res.json({
        message: 'Successfully logged in!',
        status: 'ok',
        user: token,
      });
    } else {
      res.json({ message: 'Either email or password is wrong!', status: 'no' });
    }
  } catch (error) {
    res.json({ message: error });
  }
});

router.route('/users').get(async (req, res) => {
  const token = req.headers['x-access-token'];

  try {
    const decode = jwt.verify(token, 'secret123');
    const email = decode.email;
    const user = await User({ email: email });
    res.json(user);
  } catch (error) {
    res.json({ message: error });
  }
});

router.route('/management').get(async (req, res) => {
  try {
    const response = await User.find({ type: 'Management' });
    res.json({ message: 'Found', status: 'ok', data: response });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

router.route('/dispatchandtracking').get(async (req, res) => {
  try {
    const response = await User.find({
      type: 'Dispatch / Tracking',
    });
    res.json({ message: 'Found', status: 'ok', data: response });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});
router.route('/billingandinvoice').get(async (req, res) => {
  try {
    const response = await User.find({ type: 'Billing / Invoice' });
    res.json({ message: 'Found', status: 'ok', data: response });
  } catch (error) {
    res.json({ message: error, status: 'no' });
  }
});

router.route('/').delete(async (req, res) => {
  const deletedUsers = await User.deleteMany({});
  res.json(deletedUsers);
});

export default router;
