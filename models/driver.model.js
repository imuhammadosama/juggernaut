import mongoose from 'mongoose';

const driverSchema = mongoose.Schema({
  id: { type: String, required: true },
  status: { type: String, required: true },
  name: { type: String, required: true },
  father_name: { type: String, required: true },
  phone: { type: String, required: true },
  driver_licence_category: { type: String, required: true },
  driver_licence_expiry: { type: Date, required: true },
  insurance_policy: { type: String, required: true },
  uploads: {
    type: Object,
    required: true,
    cnic: {
      type: String,
      required: true,
    },
    drivers_licence: {
      type: String,
      required: true,
    },
  },
  other_details: {
    type: Object,
    required: true,
    shipper_id: { type: String, required: true },
    approved_by: { type: String, required: true },
    rejected_by: { type: String, required: true },
  },
});

export default mongoose.model('Driver', driverSchema);
