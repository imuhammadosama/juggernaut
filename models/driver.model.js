import mongoose from 'mongoose';

const driverSchema = mongoose.Schema({
  cnic: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  name: { type: String, required: true },
  father_name: { type: String, required: true },
  phone: { type: String, required: true },
  licence_category: { type: String, required: true },
  licence_expiry: { type: Date, required: true },
  insurance_policy: { type: String, required: true },
  health_condition: { type: String, required: true },
  upload_cnic: { type: Array, required: true },
  upload_licence: { type: Array, required: true },
  client: {
    type: Object,
    required: true,
    id: { type: String, required: true },
    name: { type: String, required: true },
  },
  approved_by: { type: String, required: true },
  rejected_by: { type: String, required: true },
});

export default mongoose.model('Driver', driverSchema);
