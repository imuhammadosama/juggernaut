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
      postalcode: { type: Number, required: true },
    },
    date: { type: Date, required: true },
    time: { type: Date, required: true },
  },
  destination: {
    type: Object,
    required: true,
    address: {
      line1: { type: String, required: true },
      line2: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String, required: true },
      postalcode: { type: Number, required: true },
    },
    date: { type: Date, required: true },
    time: { type: Date, required: true },
  },
  calculated_distance: { type: Number, required: true },
  details: {
    type: Object,
    required: true,
    distance: { type: Number, required: true },
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
    comodity_description: { type: String, required: true },
    quantity_description: { type: String, required: true },
    notes: { type: String, required: true },
  },
  consignor: {
    type: Object,
    required: true,
    name: { type: String, required: true },
    phone: { type: Number, required: true },
  },
  consignee: {
    type: Object,
    required: true,
    name: { type: String, required: true },
    phone: { type: Number, required: true },
  },
  dispatched_document: {
    type: Object,
    required: true,
    path: { type: String, required: true },
  },
  invoice_document: {
    type: Object,
    required: true,
    path: { type: String, required: true },
  },
  tracking_details: [Object],
  other_details: {
    type: Object,
    required: true,
    business_id: { type: String, required: true },
    shipper_id: { type: String, required: true },
    amount_set_by: { type: String, required: true },
    tracked_by: { type: String, required: true },
  },
});

export default mongoose.model('Load', loadSchema);
