import mongoose from 'mongoose';

const vehicleSchema = mongoose.Schema({
  registeration_number: { type: String, required: true },
  status: { type: String, required: true },
  make: { type: String, required: true },
  year: { type: Date, required: true },
  trailer_type: { type: String, required: true },
  trailer_axles: { type: String, required: true },
  chasis_number: { type: String, required: true },
  engine_number: { type: String, required: true },
  insurance_policy: { type: String, required: true },
  upload_documents: { type: Array, required: true },
  upload_images: { type: Array, required: true },
  client: {
    type: Object,
    required: true,
    id: { type: String, required: true },
    name: { type: String, required: true },
  },
  approved_by: { type: String, required: true },
  rejected_by: { type: String, required: true },
});

export default mongoose.model('Vehicle', vehicleSchema);
