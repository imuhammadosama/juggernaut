import mongoose from 'mongoose';

const clientSchema = mongoose.Schema({
  id: { type: String, required: true },
  status: { type: String, required: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  ntn: { type: String, required: true },
  strn: { type: String, required: true },
  email: { type: String, required: true },
  address: {
    line1: { type: String, required: true },
    line2: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    zipcode: { type: Number, required: false },
  },
  authorize_person_name: { type: String, required: true },
  authorize_person_phone: { type: String, required: true },
  commodity: { type: Array, required: true },
  isSuspended: {
    type: Object,
    required: true,
    status: { type: Boolean, required: true },
    suspended_period: { type: String, required: true },
  },
  isBlacklisted: {
    status: { type: Boolean, required: true },
  },
  other_details: {
    approved_by: { type: String, required: true },
    suspended_by: { type: String, required: true },
    blacklisted_by: { type: String, required: true },
  },
});

export default mongoose.model('Client', clientSchema);
