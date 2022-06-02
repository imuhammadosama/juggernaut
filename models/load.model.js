import mongoose from 'mongoose';

const loadSchema = mongoose.Schema({
  id: { type: String, required: true },
  status: { type: String, required: true },
  start_date: { type: Date, required: true },
  amount: { type: Number, required: true },
  origin: {
    type: Object,
    required: true,
    address: {
      line1: { type: String, required: true },
      line2: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String, required: true },
      postalcode: { type: String, required: true },
    },
    date_and_time: { type: Date, required: true },
  },
  destination: {
    type: Object,
    required: true,
    address: {
      line1: { type: String, required: true },
      line2: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String, required: true },
      postalcode: { type: String, required: true },
    },
    date_and_time: { type: Date, required: true },
  },
  distance: { type: String, required: true },
  commodity: { type: String, required: true },
  details: {
    type: Object,
    required: true,
    trailer_type: { type: String, required: true },
    trailer_axle: { type: String, required: true },
    full_or_partial: { type: String, required: true },
    capacity: {
      value: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    quantity: { type: Number, required: true },
    weight: {
      value: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    volume: {
      value: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    commodity_description: { type: String, required: true },
    quantity_description: { type: String, required: true },
    notes: { type: String, required: true },
  },
  consignor: {
    type: Object,
    required: true,
    name: { type: String, required: true },
    phone: { type: String, required: true },
  },
  consignee: {
    type: Object,
    required: true,
    name: { type: String, required: true },
    phone: { type: String, required: true },
  },
  tracking_details: [Object],
  driver_name: { type: String, required: true },
  vehicle_registeration_number: { type: String, required: true },
  business_id: { type: String, required: true },
  business_name: { type: String, required: true },
  carrier_id: { type: String, required: true },
  carrier_name: { type: String, required: true },
  amount_set_by: { type: String, required: true },
  tracked_by: { type: String, required: true },
});

export default mongoose.model('Load', loadSchema);
